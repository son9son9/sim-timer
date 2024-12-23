## sim-timer

정해진 시간마다 스킬을 반복하기 위한 최적의 타이머

### 프로젝트 도메인

https://sim-timer.kro.kr

### 프로젝트 설명

- 시간 설정에서 타이머 시간을 설정하고 타이머 글자 또는 재생 버튼을 클릭하면 타이머가 시작됩니다.
- 경고 시간을 지정하고 지정한 시간에 도달하면 백그라운드와 타이머 글자가 붉은색으로 점멸합니다.
- 타이머 종료 시 백그라운드와 타이머 글자가 붉은색으로 고정됩니다.
- 리셋 버튼을 누르면 타이머가 설정한 시간으로 초기화됩니다.
- 타이머 글자 또는 재생 버튼을 클릭하면 타이머가 다시 시작됩니다.

추후 필요에 따라 여러 기능을 추가할 예정입니다.

### 개발 환경

#### 프로젝트 스펙

- Next.js 15
- TypeScript
- Tailwind CSS
- GitHub-Pages

#### 핵심 로직

- Web Worker, setInterval() 을 활용한 카운트다운 타이머 구현

### 이미지 출처

https://maplestory.wiki/
