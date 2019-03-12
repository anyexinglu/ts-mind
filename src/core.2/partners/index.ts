import { VNode } from "core.2/components/VTopic";
import { destroyObject } from "utils/tools";
import { SVGLine } from "./line";
import { TopicExpander } from "./expander";
import { createDivElement } from "utils/view";

export type IMPartnerType = "topic" | "node";

export type IMPartnerRenderThing = IMEmpty | number | boolean | string | Node;
export type IMPartnerGenerater = (vt: VNode) => Partner;
export interface IMPartnerMap {
  [k: string]: IMPartnerGenerater;
}

function _addPartner(this: IMPartnerMap, pname: string, generater: IMPartnerGenerater, replace: boolean = false) {
  const _had = pname in this;
  if (!_had || replace) {
    this[pname] = generater;
    console.warn(`The Partner named [${pname}] has been force replaced!`);
    return true;
  }
  console.error(`Duplicate Partner name [${pname}]!`);
  return false;
}

// those partners will be used in all VNode component
export const GlobalPartnerMap: IMPartnerMap = {
  line: (vt: VNode) => new SVGLine(vt),
  expander: (vt: VNode) => new TopicExpander(vt)
};

export function globalPartner() {
  return {
    add: _addPartner.bind(GlobalPartnerMap),
    get(pname: string) {
      if (!pname) return GlobalPartnerMap;
      return GlobalPartnerMap[pname];
    }
  };
}

//
export function scopedPartner() {
  const _partners: IMPartnerMap = {};
  return {
    add: _addPartner.bind(_partners),
    get(pname?: string): IMPartnerMap | IMPartnerGenerater {
      const _all = { ...GlobalPartnerMap, ..._partners };
      if (!pname) return _all;
      return _all[pname];
    }
  };
}

export class Partner {
  vt: VNode;
  // where is this Partner bind，depends on its type
  public type: IMPartnerType;
  public insertBefore: boolean = false;
  public element: HTMLElement = createDivElement();
  // default className
  public className: string = `tsm-partner-${this.type}`;
  // life circle flag
  public _mounted: boolean = false;
  public _destroyed: boolean = false;
  constructor(vt: VNode) {
    this.vt = vt;
  }
  // Called synchronously before the partner's element be insterted into topic-box or topic-wrapper node.
  public beforeMount() {}
  // Called synchronously after the partner's element is insterted into topic-box or topic-wrapper node.
  public mounted() {}
  // Called synchronously after the bound topic-node updated.
  public unmount() {}
  // Called synchronously after the bound topic-node updated.
  public nodeUpdated() {}

  // Framework hooks
  public readonly $mount = () => {
    this.$beforeMount();
    mountPartner.call(this);
    this.mounted();
  };
  public readonly $unmount = () => {
    unmountPartner.call(this);
    if (!this._destroyed) {
      destroyObject(this);
      // set destroyed flag
      this._destroyed = true;
    }
    this.unmount();
  };
  public readonly $nodeUpdated = () => {
    this.nodeUpdated();
  };
  public readonly $beforeMount = () => {
    this.beforeMount();
  };
}

export function unmountPartner(this: Partner, ctx: Partner = this) {
  if (ctx.element) {
    if ((ctx.type = "node")) {
      ctx.vt.view.elements.wrapper.removeChild(ctx.element);
    } else {
      ctx.vt.view.elements.topicBox.removeChild(ctx.element);
    }
  }
}

export function mountPartner(this: Partner, ctx: Partner = this) {
  // upate classname
  if (this.element.className !== this.className) this.element.className = this.className;
  if ((ctx.type = "node")) {
    const wrapper = ctx.vt.view.elements.wrapper;
    if (ctx.insertBefore) {
      wrapper.insertBefore(ctx.element, wrapper.firstElementChild);
    } else wrapper.appendChild(ctx.element);
  } else {
    const topicBox = ctx.vt.view.elements.topicBox;
    if (ctx.insertBefore) {
      topicBox.insertBefore(ctx.element, topicBox.firstElementChild);
    } else topicBox.appendChild(ctx.element);
  }
}