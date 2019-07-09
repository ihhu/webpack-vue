const path=require("path");

const resolve = dir => path.join(__dirname, "..", dir);

const BASE_PATH=process.cwd();
const ENTRY_PATH=`${BASE_PATH}/src/`;
const OUTPUT_PATH=`${BASE_PATH}/dist/`;
const OUTPUT_PATH_IMAGE=`Style/Images/`
const OUTPUT_PATH_FONT=`Style/Font/`
const OUTPUT_PATH_JS=`JS/`
const OUTPUT_PATH_CSS=`Style/Css/`;
const VIEWS_PATH = resolve("public/pages/")

const config = {
    //base path
    BASE_PATH,
    //entry path
    ENTRY_PATH,
    //views path
    VIEWS_PATH,
    //output path
    OUTPUT_PATH,
    //output images path
    OUTPUT_PATH_IMAGE,
    //output font path
    OUTPUT_PATH_FONT,
    //output js path
    OUTPUT_PATH_JS,
    //output css path
    OUTPUT_PATH_CSS,
    //resolve
    resolve
}
module.exports= config;