import dayjs from "dayjs";

export const getDateDifference = (date) => {
  const dateObj1 = dayjs(date);
  const dateObj2 = dayjs();
  const diffDays = dateObj2.diff(dateObj1, "day");
  return Math.abs(diffDays);
};

export const getDate = (days) => {
  const dateObj = dayjs().add(days, "day");
  return dateObj.format("MM-DD-YYYY");
};


export const generateCsv = (data) => {
  const replacer = (key, value) => (value === null ? "" : value);
  const headers = Object.keys(data[0]);
  
  const csvRows = data.map((row) =>
    headers.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(",")
  );
  
  const csv = [headers.join(","), ...csvRows].join("\r\n");
  
  return csv;
};

export const downloadCsv = (csv, fileName = "data.csv") => {
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), {
    href: url,
    download: fileName,
    style: "display:none",
  });

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

