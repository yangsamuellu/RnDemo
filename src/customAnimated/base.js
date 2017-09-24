import {AnimatedWithChildren} from "react-native";

class AnimatedNode {
  __attach(): void {}
  __detach(): void {
    if (this.__isNative && this.__nativeTag != null) {
      NativeAnimatedHelper.API.dropAnimatedNode(this.__nativeTag);
      this.__nativeTag = undefined;
    }
  }
  __getValue(): any {}
  __getAnimatedValue(): any {
    return this.__getValue();
  }
  __addChild(child: AnimatedNode) {}
  __removeChild(child: AnimatedNode) {}
  __getChildren(): Array<AnimatedNode> {
    return [];
  }

  /* Methods and props used by native Animated impl */
  __isNative: boolean;
  __nativeTag: ?number;
  __makeNative() {
    if (!this.__isNative) {
      throw new Error('This node cannot be made a "native" animated node');
    }
  }
  __getNativeTag(): ?number {
    NativeAnimatedHelper.assertNativeAnimatedModule();
    invariant(
      this.__isNative,
      'Attempt to get native tag from node not marked as "native"',
    );
    if (this.__nativeTag == null) {
      const nativeTag: ?number = NativeAnimatedHelper.generateNewNodeTag();
      NativeAnimatedHelper.API.createAnimatedNode(
        nativeTag,
        this.__getNativeConfig(),
      );
      this.__nativeTag = nativeTag;
    }
    return this.__nativeTag;
  }
  __getNativeConfig(): Object {
    throw new Error(
      'This JS animated node type cannot be used as native animated node',
    );
  }
  toJSON(): any {
    return this.__getValue();
  }
}

class AnimatedWithChildren extends AnimatedNode {
  _children: Array<AnimatedNode>;

  constructor() {
    super();
    this._children = [];
  }

  __makeNative() {
    if (!this.__isNative) {
      this.__isNative = true;
      for (const child of this._children) {
        child.__makeNative();
        NativeAnimatedHelper.API.connectAnimatedNodes(
          this.__getNativeTag(),
          child.__getNativeTag(),
        );
      }
    }
  }

  __addChild(child: AnimatedNode): void {
    if (this._children.length === 0) {
      this.__attach();
    }
    this._children.push(child);
    if (this.__isNative) {
      // Only accept "native" animated nodes as children
      child.__makeNative();
      NativeAnimatedHelper.API.connectAnimatedNodes(
        this.__getNativeTag(),
        child.__getNativeTag(),
      );
    }
  }

  __removeChild(child: AnimatedNode): void {
    const index = this._children.indexOf(child);
    if (index === -1) {
      console.warn("Trying to remove a child that doesn't exist");
      return;
    }
    if (this.__isNative && child.__isNative) {
      NativeAnimatedHelper.API.disconnectAnimatedNodes(
        this.__getNativeTag(),
        child.__getNativeTag(),
      );
    }
    this._children.splice(index, 1);
    if (this._children.length === 0) {
      this.__detach();
    }
  }

  __getChildren(): Array<AnimatedNode> {
    return this._children;
  }
}
