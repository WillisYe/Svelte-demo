/*
 * @Author: dary
 * @Date: 2021-01-28 16:18:59
 * @LastEditors: dary
 * @LastEditTime: 2021-01-28 16:28:51
 * @Description: file content
 */
import Home from "./pages/Home.svelte";
import Random from "./pages/Random.svelte";
import Hello from "./pages/Hello.svelte";

const routes = {
  "/": Home,
  "/random": Random,
  "/hello/:name?": Hello,
};

export default routes;
