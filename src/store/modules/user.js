import { loginOut } from "@/api";
import { removeToken } from "@/utils/auth";

const userInfo = {
  state: {
    accountName: "",
    userId: "",
  },
  mutations: {
    updateUserInfo: (state, payload) => {
      Object.assign(state, payload);
    },
    SET_USERINFO: (state, payload) => {
      Object.assign(state, payload);
    },
  },
  actions: {
    Login({ commit }, userInfo) {
      commit("SET_USERINFO", userInfo);
    },
    Logout({ commit, state }) {
      return loginOut(state.token).then(() => {
        removeToken();
        commit("REMOVE_ROUTER_FLAG");
      });
    },
  },
};

export default userInfo;
