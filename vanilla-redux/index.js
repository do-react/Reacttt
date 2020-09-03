import { createStore } from "redux"; //store만들기 위해선 createStore를 사용해야함

//DOM레퍼런스 만들기
const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");

//액션 타입과 액션 생성 함수 정의
const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

//액션 생성함수
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

//초기값 설정
const initialState = {
  toggle: false,
  counter: 0,
};

//리듀서 함수 정의
//state가 undefined일 때는 initialState를 기본값으로 사용
function reducer(state = initialState, action) {
  //action.type에 따라 다른 작업을 처리함
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state, // 불변성 유지해야함
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

//render 함수 만들기 이 함수는 상태가 업데이트 될 때마다 호출되고, 리액트의 render함수와는 다르게 이미 html을 사용하여 만들어진 UI의 속성을 상태에 따라 변경해준다.
const render = () => {
  const state = store.getState(); //현재 상태를 불러온다.
  // 토글처리
  if (state.toggle) {
    divToggle.classList.add("active");
  } else {
    divToggle.classList.remove("active");
  }
  //카운터처리
  counter.innerText = state.counter;
};

render();
store.subscribe(render); //스토어의 상태가 바뀔 때마다 방금 만든 render 함수가 호출되도록 설정

divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};
btnIncrease.onclick = () => {
  store.dispatch(increase(1));
};
btnDecrease.onclick = () => {
  store.dispatch(decrease());
};
