import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Box } from "@material-ui/core";
import listCollections from "../assets/home/listCollections";
import ColeccionIndividual from "./ColeccionIndividual"

const useStyles = makeStyles((theme) => ({
  linearCollections: {
    display: "flex",
    gap: "10px",
    flexWrap: 'wrap',
    width: 'calc(100% - 70px)',
    marginBottom: "30px",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      overflow: "auto",
    },
  },
  titleContainer: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    gap: "5px",
    color: theme.palette.primary.main,
  },
  title: {
    margin: "0",
    fontWeight: "bold",
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    // borderTop: '1px dashed rgba(255,255,255,.2)',
    // paddingTop: 40,
    marginTop: 40,
    marginBottom: 20,
  },
  separator: {
    color: theme.palette.primary.main,
    height: "1px",
    backgroundColor: theme.palette.primary.main,
    marginBottom: "20px",
  },
}));

const RandomCollections = (props) => {
  const [img, setImg] = React.useState(null);
  const [collections, setCollections] = React.useState([]);
  const classes = useStyles();
  useEffect(() => {
    getRandomCollections(props.lenght);
  }, []);
  const getRandomCollections = async (lenght = 5) => {
    // const resp = await SearchService.serviceCollectionMuseo({
    //   size: lenght,
    //   random: true,
    // });

    getRandomLocalCollections();

    // setCollections(resp?.hits?.hits.map((item) => item._source));
  };

  const getRandomLocalCollections = () => {
    let localListCollections = listCollections.sort(function () {
      return 0.5 - Math.random();
    });

    const listFive = localListCollections.slice(0, 2);
    const resp = listFive.map((d) => {
      return d;
    });
    setCollections(resp);
  };

  return (
    <Box
      style={{ width: '100%', background: 'rgba(0,0,0,.1)', marginTop: 40 }}
    >
      <h3 className={classes.title}>También te puede interesar</h3>
      <div className={classes.linearCollections}>
        {collections && collections.length
          ? collections.map((t, y) => {
            return (
              <ColeccionIndividual
                slug={t.slug.slice(1, t.slug.lenght)}
              />
            );
          })
          : ""}
      </div>
    </Box>
  );
};

export default RandomCollections;
