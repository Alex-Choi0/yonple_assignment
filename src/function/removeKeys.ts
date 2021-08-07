export const removeKeys = (ele: any, arr: Array<string>) : any => {

  for(let i = 0; i < arr.length; i++){
    delete ele.user[arr[i]]
  }

  return ele;
}
