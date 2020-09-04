import { createAction, handleActions } from 'redux-actions';

//액션 타입 정의하기
const INCREASE = 'counter/INCREASE'; //액션타입은 대문자로 정의, 문자열 내용은 모듈이름/액션이름과 같은 형태로 작성
const DECREASE = 'counter/DECREASE';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

//액션 생성 함수 만들기
// export const increase = () => ({ type: INCREASE }); //export는 여러개 내보낼 수 있음. export default는 단 한개만 내보낼 수 있음. 불러오는 방식도 다르다
// export const decrease = () => ({ type: DECREASE });

//초기 상태 및 리듀서 함수 만들기
const initialState = {
  number: 0,
};

const counter = handleActions(
  //함수의 첫번째 파라미터에 각 액션에 대한 업데이트 함수를 넣어주고 두번째 파라미터에는 초기 상태를 넣어준다.
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState,
);

export default counter;
