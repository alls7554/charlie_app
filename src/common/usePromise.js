import { useEffect, useState } from 'react';

export default function usePromise(promiseCreator, deps) {
  // 대기 중/완료/실패에 대한 상태관리
  const [loading, setLoading] = useState(true);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [loading, resolved, error];
}