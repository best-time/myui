class Load {
  constructor(node, props, emit, callback) {
    this.node = node;
    this.props = props;
    this.emit = emit;
    this.callback = callback; // 新增 callback 参数
  }
  loadCreateImg = (errSrc) => {
    const newImg = new Image();

    if (errSrc) {
      newImg.src = errSrc;
    } else {
      newImg.src = this.props.src;
    }

    newImg.addEventListener("error", (evt) => {
      this.onerror(evt);
    });

    newImg.addEventListener("load", (evt) => {
      this.onload(evt, newImg.src);
    });
  };
  onload = (evt, src) => {
    this.node.src = src;
    this.emit("load", evt);

    // 如果 callback 存在，在加载成功的时候返回 true
    if (this.callback) {
      this.callback(true);
    }
  };
  onerror = (evt) => {
    if (this.props.errSrc) {
      this.loadCreateImg(this.props.errSrc);
      this.props.errSrc = "";
      return;
    }

    this.emit("error", evt);
    // 如果 callback 存在，在加载失败的时候返回 false
    if (this.callback) {
      this.callback(false);
    }
  };
}

class Lazy extends Load {
  constructor(img, props, emit, callback) {
    // super 关键字调用
    super(img, props, emit, callback);
  }
  observer = () => {
    const observer = new IntersectionObserver(
      (arr) => {
        // 如果进入可视区域
        if (arr[0].isIntersecting) {
          // 开始加载图片 调用父类
          this.loadCreateImg();
          observer.unobserve(this.node);
        }
      },
      /**
       * rootMargin 为触发懒加载的距离 通过 props 传入
       * https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin
       */
      { rootMargin: this.props.rootMargin }
    );
    return observer;
  };
  // 执行 懒加载
  lazyCreateImg = () => {
    // IntersectionObserver 内部方法，需要将 dom 节点传入
    this.observer().observe(this.node);
  };
}

// 使用
// 导出对外接口
export const loadImage = (node, prop, emit, callback) => {
  /**
   * 如果传入了 lazy 则执行懒加载类
   * 否则执行正常加载类
   */
  if (prop.lazy) {
    const lazy = new Lazy(node, prop, emit, callback);
    return lazy.lazyCreateImg();
  }
  const load = new Load(node, prop, emit, callback);
  load.loadCreateImg();
};
