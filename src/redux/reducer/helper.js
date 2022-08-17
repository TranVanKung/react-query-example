import update from "immutability-helper";

update.extend("$updateOrDelete", (value, listData) => {
  // console.log("value to update", value);
  // console.log("list data to find in", listData);
  const index = listData.findIndex(
    (item) => item[value[2] || "id"] === value[0]
  );

  if (index === -1) {
    return listData;
  }

  if (value[1]) {
    return update(listData, {
      [index]: { $merge: value[1] },
    });
  }

  if (value[0] && !value[1]) {
    return update(listData, {
      $splice: [[index, 1]],
    });
  }

  return listData;
});

export default update;
