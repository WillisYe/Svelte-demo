/*
 * @Author: dary
 * @Date: 2021-01-28 16:18:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-23 10:44:53
 * @Description: file content
 */
import Home from "./pages/Home.svelte";
import Random from "./pages/Random.svelte";
import Hello from "./pages/Hello.svelte";
import Canvas from "./pages/Canvas.svelte";
import Houdini from "./pages/Houdini.svelte";

const routes = {
  "/": Home,
  "/home": Home,
  "/random": Random,
  // "/hello/:name?": Hello,
  "/Canvas": Canvas,
  "/Houdini": Houdini,  
};

export default routes;
