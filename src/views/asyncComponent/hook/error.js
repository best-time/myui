import { ref }from 'vue'
export default function useError() {

  const  hasError  =  ref(false);
  const  error  =  ref(null);

  const  resetError  =  ()  =>  {
    console.log(2)
    hasError.value  =  false;
    error.value  =  null;
  };

//  使用  errorCaptured  处理错误
  const  errorCaptured  =  (err, vm, info)  =>  {
    console.log(1111, err, vm, info)
    hasError.value  =  true;
    error.value  =  err;
    return  false;  //  返回  以阻止继续传播错误
  };
  return {
    hasError,
    error,
    resetError,
    errorCaptured
  }
}
