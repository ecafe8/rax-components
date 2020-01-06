const noop = () => {};

const triggleVisible = (instance, props) => {
  const { visible, onShow, onHide } = props;
  instance.setData(
    {
      visibility: visible
    },
    () => {
      if (visible) {
        onShow && onShow();
      } else {
        onHide && onHide();
      }
    }
  );
};

const updateData = (instance, props) => {
  if (props.delay) {
    setTimeout(() => {
      triggleVisible(instance, props);
    }, props.delay);
  } else {
    triggleVisible(instance, props);
  }
  const mask_style = computeStyle(props.maskStyle);
  const content_style = computeStyle(props.contentStyle);
  instance.setData({
    mask_style: mask_style,
    content_style: content_style
  });
};

Component({
  data: {
    visibility: false,
    mask_style: '',
    content_style: ''
  },
  props: {
    visible: false,
    maskStyle: {},
    contentStyle: {},
    onShow: noop,
    onHide: noop,
    maskCanBeClick: true,
    delay: 0,
    duration: 300
  },
  didUpdate() {
    // eslint-disable-next-line no-undef
    if (!my.canIUse('component2')) {
      updateData(this, this.props);
    }
  },
  deriveDataFromProps(nextProps) {
    updateData(this, nextProps);
  },
  onClick() {
    const { maskCanBeClick, onHide } = this.props;
    if (maskCanBeClick) {
      onHide && onHide();
    }
  }
});

function computeStyle(style) {
  let handledStyle = '';
  Object.keys(style).forEach(key => {
    handledStyle = handledStyle + `${key}: ${style[key]};`;
  });
  return handledStyle;
}
