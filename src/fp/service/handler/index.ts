import {pipe, TFunc} from './utils';

export default <T extends TFunc>(callback: T) =>
  pipe(callback, (result: ReturnType<T>) => {
    console.log(`클라이언트에게 응답을 보냅니다: ${JSON.stringify(result)}`);
    return result;
  });
