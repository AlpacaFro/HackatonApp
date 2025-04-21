// MUI Import
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

//Img Import
import ron_Img from "../infoImage/ronImage.jpeg";
import haviv_Img from "../infoImage/havivImage.jpeg";
import yohan_Img from "../infoImage/yohanImg.jpeg";
import logo from "../infoImage/shtef-no-bg.png";

export default function ImagesList() {
  return (
    <Box sx={{ width: "100%", height: 530, overflowY: "scroll" }}>
      <ImageList variant="masonry" cols={2} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.title}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar position="below" title={item.author} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: logo,
    title: "",
    author: "",
  },

  {
    img: haviv_Img,
    title: "Haviv Bitton",
    author: "Haviv Bitton",
  },
  {
    img: yohan_Img,
    title: "Yohan Matzger",
    author: "Yohan Matzger ",
  },
  {
    img: ron_Img,
    title: "Ron Sherling",
    author: "Ron Sherling",
  },
];
