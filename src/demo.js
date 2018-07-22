import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PropTypes from "prop-types";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CancelIcon from "@material-ui/icons/Cancel";
import BackIcon from "@material-ui/icons/ArrowBack";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Divider from "@material-ui/core/Divider";
import _ from "lodash";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import compose from "recompose/compose";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  textField: {
    //paddingLeft: 100,
    width: 200,
    flex: 1,
    color: "#fff"
  },
  hidden: {
    display: "none"
  },
  itemButton: {
    textAlign: "left",
    textTransform: "none"
  },
  listItem: {
    //dense: true
  }
};

class ScrollDialog extends React.Component {
  state = {
    filter: "",
    open: false,
    //scroll: "paper",
    width: "",
    items: [
      "Enrolled Jobs",
      "Accepted Jobs",
      null,
      "Ag Partners - Central",
      "Ag Partners - East",
      "Ag Partners - West",
      "Ag Partners, LLC",
      "AgSolutions",
      "AgVantage FS - Ackley/Alden/IF",
      "AgVantage FS - Alburnett",
      "AgVantage FS - Alexander",
      "AgVantage FS - Allison",
      "AgVantage FS - Aplington",
      "AgVantage FS - Charles City",
      "AgVantage FS - DeWitt",
      "AgVantage FS - Eldora/Grundy Center",
      "AgVantage FS - Garner",
      "AgVantage FS - Hampton/Coulter",
      "AgVantage FS - Hazleton",
      "AgVantage FS - Janesville/Dewar",
      "AgVantage FS - Lone Tree/West Branch",
      "AgVantage FS - Lowden",
      "AgVantage FS - Lyle",
      "AgVantage FS - Maquoketa",
      "AgVantage FS - Maynard",
      "AgVantage FS - Mechanicsville",
      "AgVantage FS - Miles",
      "AgVantage FS - New Hampton",
      "AgVantage FS - Nora Springs",
      "AgVantage FS - Osage",
      "AgVantage FS - Oxford",
      "AgVantage FS - Quasquenton",
      "AgVantage FS - Sumner",
      "AgVantage FS - Thornton",
      "AgVantage FS - Waukon",
      "AgVantage FS - West Union/Hawkeye",
      "Alligare",
      "Asmus Farm Supply - Allison",
      "Asmus Farm Supply - Coulter",
      "Asmus Farm Supply - Manly",
      "Aurora Coop",
      "Bockhorn Ag, Inc.",
      "Brad Jackson",
      "Campbell County Weed & Pest",
      "Centennial Ag Supply Co. ",
      "Central Montana Coop",
      "Clover Leaf Grain LLC",
      "Converse County Weed and Pest",
      "Coosa Forestry Services, Inc.",
      "Dean Sponheim",
      "ECI - Jesup",
      "Evanson Aero",
      "F. J. Krob & Co. - Solon",
      "Farmers Cooperative - Readlyn, Shell Rock",
      "Farmers Feed & Grain",
      "Farmers Union Coop",
      "FC Coop",
      "Five Star Co-op - Mason City",
      "Five Star Co-op - New Hampton",
      "Floyd County Ag Center",
      "Four County Ag",
      "Frank Moore",
      "Fredricksburg Farmers Coop.",
      "Gateway FS",
      "Hefty Seed",
      "Hendricks Feed & Seed",
      "House Acct. - Klinkenborg Aviation",
      "House Acct. - Pocahontas",
      "Irvington Elevator",
      "Johnson Chemical",
      "Landus Coop Region 4",
      "Landus Cooperative -",
      "Liqui-Grow - Clear Lake",
      "Liqui-Grow - Hampton",
      "MBS Family Farms",
      "Merschman Seeds",
      "MFA - Bethany",
      "MFA - Brookfield",
      "MFA - Browning / Milan",
      "MFA - California",
      "MFA - Chillicothe",
      "MFA - Hale",
      "MFA - Jefferson City",
      "MFA - Laredo/Trenton",
      "MFA - River Valley",
      "MFA - Sedalia ",
      "MFA - Tipton",
      "MFA - Versailles",
      "North Central Coop",
      "North Iowa Coop - Clear Lake (Klinkenborg)",
      "Northwood Ag Products",
      "NRCS - Caledonia",
      "NRCS - Carroll County",
      "NRCS - Waukon",
      "Osage Coop Elevator",
      "Pitchford Elevator",
      "Ron Salge",
      "Sac County SWCD",
      "Security Seed & Chemical",
      "SilverEdge Coop - Edgewood",
      "SilverEdge Coop - Strawberry Point",
      "Sinclair Elevator, Inc.",
      "SkyShare ",
      "South Central FS",
      "Southern FS - Eldorado",
      "SWCD - Clayton",
      "SWCD - Decorah",
      "SWCD - West Union",
      "Three Rivers ",
      "Titan Pro  - Clear Lake",
      "Viafield (fw)",
      "Viafield (heli)",
      "Weston County Weed & Pest",
      null,
      "Archived Jobs"
    ]
  };

  handleClickOpen = (scroll, width) => () => {
    var myScroll = scroll;
    //console.log(width);
    //console.log(isWidthDown("sm", width));
    if (isWidthDown("sm", width)) {
      //console.log("is down");
      myScroll = "paper";
    }
    //console.log(myScroll);

    this.setState({ open: true, scroll: myScroll });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSearch = e => {
    //console.log(e.target.value);
    this.setState({ filter: e.target.value });
  };

  handleCancelSearch = e => {
    this.setState({ filter: "" });
  };

  render() {
    //console.log(this.props);
    const { classes, fullScreen, width } = this.props;
    var scroll = this.state.scroll;
    //console.log(isWidthUp(width, "xs"));

    //console.log(scroll);
    return (
      <div>
        <Button onClick={this.handleClickOpen("paper", width)}>
          scroll=paper
        </Button>
        <Button onClick={this.handleClickOpen("body", width)}>
          scroll=body
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          fullScreen={fullScreen}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.handleClose}
                aria-label="Close"
              >
                <BackIcon />
              </IconButton>
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                Jobs {this.state.width}
              </Typography>
              <TextField
                value={this.state.filter}
                className={classes.textField}
                placeholder="Search"
                onChange={this.handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      className={
                        _.isEmpty(this.state.filter) ? classes.hidden : ""
                      }
                    >
                      <CloseIcon
                        onClick={this.handleCancelSearch}
                        fontSize="inherit"
                      />
                    </InputAdornment>
                  )
                }}
              />
            </Toolbar>
          </AppBar>

          <DialogContent>
            <List>
              {this.state.items
                .filter(function(key) {
                  if (_.isEmpty(this.state.filter)) {
                    return true;
                  } else {
                    //console.log(this.state.filter);
                    if (_.isNull(key)) {
                      return false;
                    } else {
                      var reg = new RegExp(this.state.filter, "i");
                      if (reg.test(key)) {
                        return true;
                      } else {
                        return false;
                      }
                    }
                  }
                }, this)
                .map(function(key) {
                  if (_.isNull(key)) {
                    return <Divider />;
                  } else {
                    return (
                      <ListItem dense={true} className={classes.listItem}>
                        <Button size="medium" className={classes.itemButton}>
                          {key}
                        </Button>
                      </ListItem>
                    );
                  }
                })}
            </List>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

ScrollDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  //filter: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired
};

//export default withWidth()(withStyles(styles)(withMobileDialog()(ScrollDialog)));
export default compose(
  withWidth(),
  withStyles(styles),
  withMobileDialog({ breakpoint: "sm" })
)(ScrollDialog);
