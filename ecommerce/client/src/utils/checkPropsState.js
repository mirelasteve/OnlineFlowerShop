export const checkPropsState = (state,props,prevProps,prevState) =>{

    Object.entries(props).forEach(([key, val]) =>
        prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    );
    if (state) {
     Object.entries(state).forEach(([key, val]) =>
        prevState[key] !== val && console.log(`State '${key}' changed`)
    );
}

}

