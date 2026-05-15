import { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import * as museo from "../store/ducks/museo.duck";
import * as ColletionService from "../services/BookmarkCollectionService";

const AutoSectionSelect = (props) => {
  const { pathname } = useLocation();
  const stringSplited = pathname.split("/");
  const section = stringSplited[1];

  props.setSection(section);

  useEffect(() => {
    ColletionService.getIdentCollection().then(
      (data) => {
        props.setUserBookmarks(data);
      },
      (error) => {
        console.log(error);
      },
    );
  });

  return <></>;
};

const mapStateToProps = (store) => ({
  currentSection: store.museo.currentSection,
});

export default connect(mapStateToProps, museo.actions)(AutoSectionSelect);
