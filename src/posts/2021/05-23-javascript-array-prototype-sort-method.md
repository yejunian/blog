---
published: true
slug: /post/2021/05/23/javascript-array-prototype-sort-method
date: 2021-05-23
revisions: []
title: JavaScript 배열의 sort() 메서드
description: >
  코딩 테스트에서 한 문제를 날려 먹을 뻔해서 정리한, JavaScript 배열 정렬 메서드
license:
  post: CC BY-NC 4.0
  code: The Unlicense
keywords:
  - JavaScript
  - ECMAScript
---

## 정리하게 된 동기

요즘에는 가능하면 코딩 테스트 문제를 JavaScript로만 풀려고 한다. 언젠가는 정렬이 필요한 문제를 JavaScript로 풀었다. 한 부분만 빼고는 제대로 풀었는데, 그 한 부분을 잘못 작성해서 한 문제를 버리게 될 뻔했다. 다행히 다른 코너 케이스를 찾다가 얻어 걸려서, 배열의 `sort()` 메서드를 잘못 사용했다는 것을 발견했다.

사실은 이전에도, `Array.prototype.sort()` 메서드가 기본적으로는 배열의 내용을 문자열로 바꾼 것을 기준으로 정렬한다는 것을 본 적이 있었다. 그런데도 잊어버리고 같은 내용을 또 틀렸다. 그래서 한번 제대로 정리해서 기록해 둘 필요를 느꼈다.

---

## `Array.prototype.sort()`의 사용법

메서드에 아무 인수도 주지 않으면 배열의 각 원소를 문자열로 취급하여 UTF-16 인코딩 기준 오름차순으로 제자리에서(in-place) 정렬한다. 그리고 정렬한 배열을 리턴한다. 정렬은 stable하지 않을 수 있다.

```javascript
const a = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'];
const b = a.sort();
console.log(b); // ['Lorem', 'amet', 'dolor', 'ipsum', 'sit']
console.log(a); // ['Lorem', 'amet', 'dolor', 'ipsum', 'sit']
console.log(a === b); // true
```

예제에서 이상해 보이는 부분이 몇 가지 보이는데, 이 부분은 조금 뒤에 다룰 것이다.

### 비교 함수 사용하기

메서드에 `(a: any, b: any) => number` 형태의 비교 함수를 인수로 주면, 규칙에 따라 정렬한다.

- (리턴 값) &lt; 0: `a`가 `b`보다 앞에 온다.
- (리턴 값) = 0
  - (ES2019 스펙부터) `a`와 `b`의 순서를 유지한다.
  - (ES2019보다 과거 스펙에서) `a`와 `b`의 순서를 보장하지 않는다.
- (리턴 값) &gt; 0: `a`가 `b`보다 뒤에 온다.
- 비교 함수의 리턴 값에 모순이 있으면 정렬 순서는 알 수 없다.

비교 함수를 정의하지 않으면 배열의 각 원소를 문자열로 취급하여 비교하므로, `number[]` 배열은 정렬이 제대로 되지 않는다. MDN의 JavaScript 레퍼런스에 그 예제가 잘 나와 있다.

```javascript
// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/
// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

const array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);
// expected output: Array [1, 100000, 21, 30, 4]
```

따라서 `number[]` 배열을 오름차순으로 올바르게 정렬하기 위해서는 다음과 같이 비교 함수를 전달해야 한다. (단, `NaN`, `Infinity`, `-Infinity`는 고려하지 않는다고 가정한다.)

```javascript
const c = [1, 30, 4, 21, 100000];
c.sort((a, b) => a - b);
console.log(c); // [ 1, 4, 21, 30, 100000 ]
```

---

## 짚고 넘어가야 하는 주의사항

예제도, 설명도 별로 어렵지 않아 보이지만, 다음 내용을 주의깊게 생각하지 않으면 잘못 사용하기 좋다.

### 1. 기본 정렬 방식: <mark>UTF-16</mark> <mark>문자열로 취급</mark>하여 오름차순 정렬

맨 처음 예제의 정렬 결과에서 `'Lorem'`이 `'amet'`보다 먼저 나왔다. 두 문자열의 첫 글자인 ‘L’(U+004C)과 ‘a’(U+0061) 중 ‘L’이 UTF-16 으로 인코딩된 내용상 먼저이기 때문이다. UTF-16으로 인코딩된 데이터 순서가 아니라 정말 사전순으로 정렬하려는 상황에는 [`String.prototype.localeCompare()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare) 메서드를 활용하라고 MDN 문서에 나와 있다.

그렇다면 UTF-16에서 두 글자로 나누어 표현되는 문자(U+10000부터)는 어떻게 될까? 결론부터 얘기하자면, 코드포인트를 비교하지 않고 나누어진 글자 단위로 비교하기 때문에 꼭 코드포인트 순서대로 정렬되지는 않는다. 코드포인트상으로는 ‘🥳’(U+1F973, Partying Face) 이모지가 ‘Ａ’(U+FF21, Fullwidth Latin Capital Letter A)보다 나중에 나온다. 하지만 JavaScript에서는 UTF-16 인코딩에 따라 ‘🥳’ 이모지를 `'\uD83E\uDD73'`으로 취급한다.(`'🥳'.length`를 테스트하면 `2`이다.) 따라서 두 문자를 정렬할 때 `'\uD83E'`와 `'\uFF21'`을 비교하게 되고, ‘🥳’ 이모지가 ‘Ａ’보다 먼저 오도록 정렬한다.

```javascript
const d = ['Ａ', '🥳']; // 또는, const d = ['\uFF21', '\u{1F973}'];
console.log(d.sort()); // [ '🥳', 'Ａ' ]
```

한편, 문자열이 아닌 것을 정렬하려면 앞에서 설명한 것처럼 비교 함수를 사용해야 한다. 이때 비교 함수의 리턴 값에 주의할 필요가 있다. 비교 함수는 결과가 0이거나, 0보다 작거나, 큰 값이 되도록 작성해야 한다. 비교 함수가 `NaN` 같은 값을 리턴하면(예: `Infinity - Infinity`) 올바른 정렬 순서가 보장되지 않는다.

### 2. Stable Sort가 아닐 수도 있음

[MDN 영문 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)에 따르면, ES2019 스펙부터 `Array.prototype.sort()`가 stable sort라고 한다. 레퍼런스를 읽어 보면, 이는 비교 함수의 리턴 값을 0과 비교하는지에 따라 결정된다는 것을 알 수 있다.

웹 브라우저별 stable sort 지원 여부는 MDN 레퍼런스 페이지와 [caniuse.com](https://caniuse.com/mdn-javascript_builtins_array_sort_stable) 등에서 확인할 수 있다. IE와 레거시 Edge를 제외한 웬만한 브라우저에서 stable sort를 지원한다. [node.green](https://node.green/)에 따르면 Node.js에서는 12.0.0 버전부터 ES2019 스펙을 지원한다. 이 버전부터는 stable sort 지원이 보장된다.(표에 stable sort가 직접적으로 언급되지는 않음)

### 3. In-Place Sort: 원본 배열을 변경함

`Array.prototype.sort()`는 원본 배열을 변경한다. 첫 번째 예제를 다시 보자.

```javascript
const a = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'];
const b = a.sort();
console.log(b); // [ 'Lorem', 'amet', 'dolor', 'ipsum', 'sit' ]
console.log(a); // [ 'Lorem', 'amet', 'dolor', 'ipsum', 'sit' ]
console.log(a === b); // true
```

`a.sort()`는 배열 `a` 자체를 변경한 뒤에 자기 자신을 리턴한다. 따라서 `b`는 `a`와 (레퍼런스가) 동일한 배열이고, `a === b`를 테스트해 보면 `true`가 나온다. 원본 배열을 변경하지 않으려면, 간단하게는 다음과 같이 원본 배열을 복제해서 정렬하는 방법을 쓸 수 있다.

```javascript
const e = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'];
const f = [...e].sort();
console.log(e); // [ 'Lorem', 'ipsum', 'dolor', 'sit', 'amet' ]
console.log(f); // [ 'Lorem', 'amet', 'dolor', 'ipsum', 'sit' ]
console.log(e === f); // false

e.sort();
console.log(e); // [ 'Lorem', 'amet', 'dolor', 'ipsum', 'sit' ]
console.log(e === f); // false
```

### 4. 비교 함수의 일관성

당연한 얘기지만, 비교 함수는 모순되지 않는 결과를 리턴해야 한다. 그렇지 않으면 정렬 순서가 보장되지 않는다. 예를 들어서, — 대소관계로 표현하긴 부적절해 보이지만 — 가위바위보에는 다음과 같은 상성이 있다.(큰 쪽이 작은 쪽을 이김)

- 가위 &lt; 바위 — (1)
- 바위 &lt; 보자기 — (2)
- 보자기 &lt; 가위 — (3)

여기서 (1), (2)에 따르면 <mark>가위 &lt; 보자기</mark>이지만, 이는 (3)에 모순이다. 이렇게 비교 함수의 리턴 값에 모순이 있으면 정렬 순서가 보장되지 않는다.

### 5. `undefined`인 원소 처리

JavaScript 배열의 `sort()` 메서드에서는 `undefined`를 다음과 같이 다룬다.

첫째, 비교 함수 전달의 유무와 관계없이 `undefined`를 배열의 맨 뒤로 옮긴다.

```javascript
const g = [
  ...new Array(3).fill(undefined),
  ...new Array(3).fill('undefined'),
  ...new Array(3).fill('undefinedd'),
  ...new Array(3).fill('undefine'),
];

// shuffle(array: any[]) => any[] - `array`의 원소의 순서를 무작위로 변경하는 함수라고 가정
const h = shuffle([...g]);
// [ 'undefined', 'undefined', 'undefine',
//   undefined, 'undefinedd', 'undefined',
//   'undefine', 'undefinedd', 'undefine',
//   'undefinedd', undefined, undefined ]

const i = [...h].sort();
// [ 'undefine', 'undefine', 'undefine',
//   'undefined', 'undefined', 'undefined',
//   'undefinedd', 'undefinedd', 'undefinedd',
//   undefined, undefined, undefined ]
```

둘째, `undefined`는 비교 함수에서 취급되지 않는다. 아래 예제에서는 비교 함수의 매개변수 중 하나가 `undefined`이면 두 매개변수를 출력하게 되어 있지만, 해당 내용은 출력되지 않는다.

```javascript
const j = [undefined, 'undefined', 'undefinedd', 'undefine'];
j.sort((a, b) => {
  if (a === undefined || b === undefined) {
    console.log('a:', a, '   b:', b);
  }
  if (a == b) {
    return 0;
  }
  return String(a) < String(b) ? -1 : 1;
});
// [ 'undefine', 'undefined', 'undefinedd', undefined ] (정렬 도중 출력은 없음)
```

이 예제에서 `undefined`를, `null`로 바꾸면, `null`과 비교가 이루어지고 `null`이 정렬 결과의 중간 부분에 끼는 것을 볼 수 있다.

---

## 요약

`Array.prototype.sort()`는...

1. 비교 함수를 전달하지 않으면 UTF-16 문자열로 취급하여 오름차순으로 정렬한다.
2. Stable Sort가 아닐 수도 있다.
3. 원본 배열을 변경한다.
4. 비교 함수를 전달할 때, 비교 함수의 리턴 값에 모순이 없어야 한다.
5. `undefined`를 맨 뒤로 보낸다.

---

## 참고 자료

- [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) — MDN Web Docs (English)
- [Array.prototype.sort()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) — MDN Web Docs (한국어)
- [Getting things sorted in V8](https://v8.dev/blog/array-sort) — V8 Blog
