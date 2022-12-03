import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer";
import uuidv4 from "uuid/v4";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import DeleteIcon from "@material-ui/icons/Delete";

import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { green, red, blue } from "@material-ui/core/colors";

import PauseIcon from "@material-ui/icons/Pause";
import Grid from "@material-ui/core/Grid";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

const faces = [
  "http://i.pravatar.cc/300?img=1",
  "http://i.pravatar.cc/300?img=2",
  "http://i.pravatar.cc/300?img=3",
  "http://i.pravatar.cc/300?img=4"
];

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    minWidth: 240,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    width: "100%"
  },
  list: {
    padding: 0
  },
  listItem: {
    //paddingBottom: 0
  },
  buttons: {
    padding: theme.spacing(1)
  },
  controls: {
    minWidth: "100px"
  },
  icon: {
    height: 18,
    width: 18
  },
  avatar: {
    display: "inline-block"
  }
}));
/*
avatar username ostalo layout sa grid

*/
function AudioPlayer({ file }) {
  const wavesurfer = useRef(null);

  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const wavesurferId = `wavesurfer--${uuidv4()}`;

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: `#${wavesurferId}`,
      waveColor: "grey",
      progressColor: "tomato",
      height: 70,
      cursorWidth: 1,
      cursorColor: "lightgray",
      barWidth: 2,
      normalize: true,
      responsive: true,
      fillParent: true
    });

    const wav =
      "https://mycryptoreferrals-uploads-test.s3-us-east-2.amazonaws.com/elrond/dd92e738-3f01-407d-a936-f68f5fe665fb/Y2Mate.is%20-%20Nicki%20Nicole%2C%20Mora%20-%20Toa%20la%20Vida%20%28Official%20Video%29-ATqVV26rbj0-48k-1658706250733.mp3";

    // console.log("wav", wav);
    wavesurfer.current.load(wav);

    wavesurfer.current.on("ready", () => {
      setPlayerReady(true);
    });

    const handleResize = wavesurfer.current.util.debounce(() => {
      wavesurfer.current.empty();
      wavesurfer.current.drawBuffer();
    }, 150);

    wavesurfer.current.on("play", () => setIsPlaying(true));
    wavesurfer.current.on("pause", () => setIsPlaying(false));
    window.addEventListener("resize", handleResize, false);
  }, []);

  useEffect(() => {
    console.log("file", file);
    if (file) {
      wavesurfer.current.load(file.blobURL);
    }
  }, [file]);

  const togglePlayback = () => {
    if (!isPlaying) {
      wavesurfer.current.play();
    } else {
      wavesurfer.current.pause();
    }
  };

  const deletePlayback = () => wavesurfer.current.destroy();

  const stopPlayback = () => wavesurfer.current.stop();

  const classes = useStyles();

  let transportPlayButton;

  if (!isPlaying) {
    transportPlayButton = (
      <IconButton onClick={togglePlayback}>
        <PlayArrowIcon className={classes.icon} />
      </IconButton>
    );
  } else {
    transportPlayButton = (
      <IconButton onClick={togglePlayback}>
        <PauseIcon className={classes.icon} />
      </IconButton>
    );
  }

  return (
    <>
      <Card className={classes.card}>
        <Grid container direction="column">
          <Grid item>
            <List className={classes.list}>
              <ListItem alignItems="flex-start" className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar} src={faces[0]} />
                </ListItemAvatar>
                <ListItemText
                  primary="Username"
                  secondary="@username · 11h ago"
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item id={wavesurferId} />
          <Grid item container className={classes.buttons}>
            <Grid item xs={5}>
              {transportPlayButton}
              <IconButton onClick={stopPlayback}>
                <StopIcon className={classes.icon} />
              </IconButton>

              <IconButton onClick={deletePlayback}>
                <DeleteIcon className={classes.icon} />
              </IconButton>
            </Grid>
            <Grid item xs={7} container justify="space-around">
              <Grid item>
                <IconButton>
                  <FavoriteIcon
                    style={{ color: blue[500] }}
                    className={classes.icon}
                  />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <ShareIcon
                    style={{ color: red[500] }}
                    className={classes.icon}
                  />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <ChatBubbleIcon
                    style={{ color: green[500] }}
                    className={classes.icon}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default AudioPlayer;
