import { useState, useEffect } from "react";

const BandInfo = () => {
  const [data, setData] = useState({
    bandName: "",
    member: {},
    url: { original: "", recompose: "" },
  });
  console.log(data);

  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          bandName: "pub",
          member: {
            drummer: "pfd",
            vocalist: "asd",
            pianist: "pfds",
          },
          url: {
            original: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            recompose: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          },
        });
      }, 2000);
    });
  };

  useEffect(async () => {
    const res = await fetchData();
    return setData(res);
  }, []);

  if (data.bandName)
    return (
      <div>
        <div>Band: {data.bandName}</div>
        {Object.entries(data.member).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
        <div>Original: {data.url.original}</div>
        <div>Recompose: {data.url.recompose}</div>
      </div>
    );
  return <div>Loading...</div>;
};

export default BandInfo;
