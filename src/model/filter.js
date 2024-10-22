export const FilterItemModel = () => ({
    key:"",
    value:"",
    valueMin:0,
    valueMax:0
});

export const FilterModel = (filterCount) => {
    if(filterCount && filterCount >0){
        const filters=[];
        for(let i=0;i<filterCount;  i++){
            filters.push(FilterItemModel());
        } 
        return filters;
    }
    return [FilterItemModel()];   
}