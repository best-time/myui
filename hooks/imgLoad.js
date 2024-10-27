function   autoPreloadImages()   {
  //   使用   require.context   动态获取指定文件夹及其子文件夹下的所有图片
  //   require.context(目录,   是否递归,   匹配文件的正则表达式)
  const   files   =   require.context('../../assets/img',   true,   /^.\.*pre-.*.(png|jpe?g|gif|webp)$/i);

  //   调用   files.keys()   获取匹配的文件路径数组，并通过   files(key)   获取每个文件的实际   URL
  const   urls   =   files.keys().map(key   =>   files(key));

  //   检查浏览器是否支持   requestIdleCallback   方法
  if   ('requestIdleCallback'   in   window)   {
    requestIdleCallback(()   =>   {
      preloadImages(urls);
    });
  }   else   {
    //   如果浏览器不支持   requestIdleCallback，则使用   window.onload   事件作为后备方案
    window.addEventListener('load',   event   =>   {
      preloadImages(urls);
    });
  }

  //   定义图片预加载函数
  function   preloadImages(urls)   {
    urls.forEach(url   =>   {
      const   img   =   new   Image();
      img.src   =   url;
    });
  }
}
