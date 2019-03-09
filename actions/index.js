let nextLogId = 1;

export const ADD_LOG = 'ADD_LOG';
export const EDIT_LOG = 'EDIT_LOG';

// export const addLog = productLog => ({
//   type: ADD_LOG,
//   id: nextLogId++,
//   productLog,
// });

// export const editLog = productLog => ({
//   type: EDIT_LOG,
//   productLog,
// });


export const addLog = (productLog) => {
  if (productLog.id) {
    return {
      type: EDIT_LOG,
      productLog,
    };
  }
  return {
    type: ADD_LOG,
    id: nextLogId++,
    productLog,
  };
};
