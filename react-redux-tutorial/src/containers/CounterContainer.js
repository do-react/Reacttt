import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';

// const CounterContainer = ({ number, increase, decrease }) => {
//   return (
//     <Counter number={number} onIncrease={increase} onDecrease={decrease} />
//   );
// };

// export default connect(
//   (state) => ({
//     number: state.counter.number,
//   }),
//   {
//     increase,
//     decrease,
//   },
// )(CounterContainer); //이코드는 connect를 이용해서 props를 넘겨주는거 직접 스토어의 내장함수 dispatch를 이용하는 것

const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]); //useDispatch를 사용할 때는 컴포넌트 성능을 최적화 해주기위해서 useCallback과 함께 사용하는게 좋다.
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};
export default CounterContainer; // 이 코드는 useSelector로 counter.number 값을 조회함으로써 Counter에게 props를 넘겨주는거
// 또 useDispatch Hook을 사용하여 컴포넌트 내부에서 스토어의 내장함수 dispatch를 사용할 수 있다.
