import {ActiveParamsType} from "../../../types/active-params.type";
import {Params} from "@angular/router";

export class ActiveParamsUtils {
  static processParams(params:Params):ActiveParamsType {
    const activeParams: ActiveParamsType = {categories: []};

    if (params.hasOwnProperty('categories')) {
      activeParams.categories = Array.isArray(params['categories']) ? params['categories'] : [params['categories']];
    }

    if (params.hasOwnProperty('frilans')) {
      activeParams.frilans = params['frilans'];
    }
    if (params.hasOwnProperty('smm')) {
      activeParams.smm = params['smm'];
    }

    if (params.hasOwnProperty('dizain')) {
      activeParams.dizain = params['dizain'];
    }

    if (params.hasOwnProperty('target')) {
      activeParams.target = params['target'];
    }

    if (params.hasOwnProperty('kopiraiting')) {
      activeParams.kopiraiting = params['kopiraiting'];
    }

    if (params.hasOwnProperty('page')) {
      activeParams.page = +params['page'];
    }
    return activeParams;
  }
}
