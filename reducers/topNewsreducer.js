const topNewsreducer = (state , action) => {
  if (action.type === 'LOADING') {
    return { ...state, loading: true }
  }
  if (action.type === 'DISPLAY_TOPNEWS') {
  
    return { ...state,  topnews: action.payload, loading: false, }
  }

  return state
}

export default topNewsreducer
