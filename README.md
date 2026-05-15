# BamgasiJM Portfolio

블랙 배경 기반의 미니멀 포트폴리오 사이트입니다.  
글리치 타이틀 애니메이션, 커스텀 커서, 필름 그레인 오버레이 등 시각적 디테일을 포함합니다.

---

## 기술 스택

| 분류 | 기술 | 버전 | 역할 |
|---|---|---|---|
| 프레임워크 | [Next.js](https://nextjs.org/) | 15.x | App Router 기반 React 프레임워크 |
| UI 라이브러리 | [React](https://react.dev/) | 19.x | 컴포넌트 렌더링 |
| 언어 | [TypeScript](https://www.typescriptlang.org/) | 5.8.x | 정적 타입 검사 |
| 스타일링 | [Tailwind CSS](https://tailwindcss.com/) | 4.x | 유틸리티 CSS, CSS 변수 기반 테마 |
| CSS 처리 | [PostCSS](https://postcss.org/) + `@tailwindcss/postcss` | 8.x | Tailwind v4 빌드 파이프라인 |
| 폰트 | Google Fonts (Bebas Neue / DM Mono / DM Sans) | — | 디스플레이 · 모노 · 본문 폰트 |

> Tailwind CSS v4는 `tailwind.config.js`를 사용하지 않습니다.  
> 테마 정의는 `globals.css` 내부의 `@theme {}` 블록에서 직접 선언합니다.

---

## 파일 트리

```
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css          # 전역 스타일, 테마 변수, 애니메이션 정의
│   │   ├── layout.tsx           # 루트 레이아웃 (html, body, 메타데이터)
│   │   └── page.tsx             # 메인 페이지 (단일 페이지 구성)
│   ├── components/
│   │   ├── Cursor.tsx           # 커스텀 마우스 커서
│   │   ├── GlitchName.tsx       # 글리치 효과 타이틀
│   │   └── Noise.tsx            # 필름 그레인 오버레이
│   └── data/
│       └── portfolio.ts         # 포트폴리오 콘텐츠 데이터
├── .gitignore
├── next.config.ts               # Next.js 설정
├── package.json
├── postcss.config.mjs           # PostCSS + Tailwind v4 설정
└── tsconfig.json
```

---

## 각 파일 설명

### `src/app/globals.css`

전역 CSS 파일입니다. 세 가지 역할을 합니다.

**1. Tailwind v4 임포트 및 Google Fonts 로드**
```css
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=...');
```

**2. `@theme {}` 블록으로 디자인 토큰 정의**  
Tailwind v4의 방식으로, 별도 config 파일 없이 CSS 안에서 직접 커스텀 변수를 선언합니다.
```css
@theme {
  --font-display: "Bebas Neue", sans-serif;   /* 타이틀용 */
  --font-mono:    "DM Mono", monospace;        /* 레이블, 태그용 */
  --font-body:    "DM Sans", sans-serif;       /* 본문용 */

  --color-bg:     #080808;   /* 배경 */
  --color-fg:     #f0ede8;   /* 기본 텍스트 */
  --color-dim:    #555550;   /* 흐린 텍스트 */
  --color-accent: #c8ff00;   /* 강조색 (라임 그린) */
  --color-line:   #1e1e1c;   /* 구분선 */
}
```

**3. 애니메이션 키프레임 정의**

| 이름 | 용도 |
|---|---|
| `fadeUp` | 요소가 아래에서 위로 올라오며 등장 |
| `fadeIn` | 투명도 0 → 1 단순 등장 |
| `blink` | 히어로 섹션 상단 상태 표시 점 깜빡임 |
| `glitch1` / `glitch2` | 타이틀 글리치 효과 (clip-path + translate) |
| `scanline` | 스캔라인 효과 (현재 미사용, 확장 용도) |

---

### `src/app/layout.tsx`

Next.js App Router의 루트 레이아웃입니다.  
`<html>`, `<body>` 태그를 정의하고 `Metadata`로 페이지 제목과 설명을 설정합니다.  
`globals.css`를 이 파일에서 임포트하여 전체 앱에 적용합니다.

```tsx
export const metadata: Metadata = {
  title: "BamgasiJM",
  description: "Creative Developer & Generative Artist",
};
```

---

### `src/app/page.tsx`

메인 페이지 컴포넌트입니다. `"use client"` 선언을 통해 Client Component로 동작합니다.  
`onMouseEnter` / `onMouseLeave` 등의 이벤트 핸들러를 사용하기 때문에 필수입니다.

페이지는 다음 4개 섹션으로 구성됩니다.

**① 고정 네비게이션 바 (`<nav>`)**  
- 화면 상단에 `position: fixed`로 고정
- 좌측: 사이트명 레이블 / 우측: WORK · STACK · CONTACT 앵커 링크
- `backdropFilter: blur(12px)`로 스크롤 시 배경 블러 처리

**② 히어로 섹션 (`<section>`)**  
- 페이지 진입 시 순차적으로 등장하는 요소들 (`animation-delay` 누적)
- 깜빡이는 초록 점 + 상태 텍스트
- `<GlitchName>` 컴포넌트로 렌더링되는 대형 타이틀
- 태그라인, 역할 테이블 (`roles` 데이터), 바이오 텍스트

**③ 스택 섹션 (`#stack`)**  
- `stacks` 데이터를 `repeat(auto-fill, minmax(220px, 1fr))` 그리드로 렌더링
- 각 카테고리(GRAPHICS / WEB / GENERATIVE / TOOLING) 별 항목 목록

**④ 작업 목록 섹션 (`#work`)**  
- `works` 데이터를 리스트로 렌더링
- 호버 시 좌측에 `2px solid var(--color-accent)` 보더가 나타나며 들여쓰기 애니메이션

**⑤ 푸터 (`#contact`)**  
- GITHUB · EMAIL · INSTAGRAM 링크
- 호버 시 텍스트 색이 `--color-accent`로 전환

파일 내부에는 두 개의 로컬 컴포넌트가 정의되어 있습니다.

- `Label` — 모노 폰트, `--color-dim` 색상의 소형 레이블 텍스트
- `Divider` — `--color-line` 색상의 1px 수평선

---

### `src/components/GlitchName.tsx`

메인 타이틀(`BamgasiJM`)에 글리치 효과를 적용하는 Client Component입니다.

구조는 동일한 텍스트를 세 레이어로 중첩하는 방식입니다.

```
glitch-main   ← 실제 표시되는 텍스트
glitch-a      ← 라임 그린 색상 레이어 (평시 opacity: 0)
glitch-b      ← 핫핑크 색상 레이어 (평시 opacity: 0)
```

`useEffect` 안에서 `setTimeout`으로 랜덤 간격(3~9초)마다 `data-glitch="true"` 속성을 토글합니다.  
글리치 발동 시 `glitch-a` / `glitch-b` 레이어에 `clip-path`와 `translate`를 조합한 CSS 애니메이션이 0.35초간 실행됩니다.

타이틀 크기는 `clamp()`로 반응형 처리합니다.
```css
font-size: clamp(100px, 20vw, 280px);
```

---

### `src/components/Cursor.tsx`

브라우저 기본 커서를 대체하는 커스텀 커서 Client Component입니다.  
`html { cursor: crosshair; }` 위에 두 레이어를 추가합니다.

| 레이어 | 크기 | 동작 |
|---|---|---|
| 점 (dot) | 4×4px, `--color-accent` | 마우스 위치에 즉각 반응 |
| 링 (ring) | 28×28px, `--color-dim` 1px 테두리 | `+=  * 0.12` 선형 보간으로 래그 있는 추적 |

`requestAnimationFrame` 루프로 링의 위치를 매 프레임 보간 업데이트합니다.  
컴포넌트 언마운트 시 이벤트 리스너와 RAF를 정리(`cleanup`)합니다.

---

### `src/components/Noise.tsx`

화면 전체에 필름 그레인 텍스처를 씌우는 오버레이 컴포넌트입니다.  
`position: fixed`로 전체 화면에 고정되며 `pointer-events: none`으로 인터랙션을 차단합니다.

SVG `<feTurbulence>` 필터를 인라인 data URI로 `background-image`에 적용합니다.  
별도 이미지 파일 없이 노이즈 패턴을 생성하므로 네트워크 요청이 발생하지 않습니다.

```css
opacity: 0.035   /* 매우 낮은 불투명도로 은은하게 적용 */
z-index: 50      /* 모든 콘텐츠 위에 위치 */
```

---

### `src/data/portfolio.ts`

페이지에 표시되는 모든 콘텐츠 데이터를 관리하는 파일입니다.  
컴포넌트 로직과 데이터를 분리하여 내용 수정 시 이 파일만 편집하면 됩니다.

| export | 타입 | 내용 |
|---|---|---|
| `profile` | `const` 객체 | 이름, 역할, 태그라인, 바이오, 위치, 연도 |
| `roles` | 배열 | 역할 테이블 (PRIMARY / FOCUS / STATUS) |
| `stacks` | 배열 | 기술 스택 카테고리 및 항목 목록 |
| `works` | 배열 | 작업 이력 (연도, 제목, 태그) |

---

### `next.config.ts`

Next.js 설정 파일입니다. 현재는 별도 설정 없이 기본값을 사용합니다.

---

### `postcss.config.mjs`

PostCSS 설정 파일입니다. Tailwind CSS v4는 `@tailwindcss/postcss` 플러그인을 통해 동작합니다.  
Tailwind v3까지 사용하던 `tailwindcss` 플러그인 대신 아래 방식을 사용합니다.

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

---

### `tsconfig.json`

TypeScript 컴파일러 설정입니다. 주요 옵션은 다음과 같습니다.

| 옵션 | 값 | 의미 |
|---|---|---|
| `moduleResolution` | `bundler` | Next.js 번들러 방식의 모듈 해석 |
| `paths` | `"@/*": ["./src/*"]` | `@/` 경로 별칭 → `src/` 디렉토리 |
| `strict` | `true` | 엄격한 타입 검사 활성화 |
| `jsx` | `preserve` | JSX 변환을 Next.js에 위임 |

---

## 시작하기

**요구 사항:** Node.js v22 이상

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속합니다.

---

## 콘텐츠 수정 방법

`src/data/portfolio.ts` 파일만 편집하면 페이지의 모든 텍스트 콘텐츠를 수정할 수 있습니다.

```ts
// 프로필 기본 정보
export const profile = { ... }

// 역할 테이블 (히어로 섹션 하단)
export const roles = [ ... ]

// 기술 스택 그리드
export const stacks = [ ... ]

// 작업 이력 리스트
export const works = [ ... ]
```

---

## 디자인 시스템

모든 색상과 폰트는 `globals.css`의 CSS 변수로 관리합니다.

```css
--color-bg:     #080808   /* 배경 */
--color-fg:     #f0ede8   /* 기본 텍스트 */
--color-dim:    #555550   /* 보조 텍스트 */
--color-accent: #c8ff00   /* 강조색 */
--color-line:   #1e1e1c   /* 구분선 */

--font-display: "Bebas Neue"   /* 타이틀 */
--font-mono:    "DM Mono"      /* 레이블, 태그 */
--font-body:    "DM Sans"      /* 본문 */
```