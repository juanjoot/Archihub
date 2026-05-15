import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

export const startegyPopover = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "POPOVER"
    );
  }, callback);
};

export const PopoverEdit = (props) => {
  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.black,
      color: "rgba(255, 255, 255, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
    arrow: {
      color: "black",
    },
  }))(Tooltip);

  const { text } = props.contentState.getEntity(props.entityKey).getData();

  const longText = text;

  return (
    <LightTooltip
      title={longText}
      interactive
      arrow
      PopperProps={{
        modifiers: {
          offset: {
            enabled: true,
            offset: "0px, -10px",
          },
        },
      }}
    >
      <span sx={{ m: 1 }}>
        <b style={{color: "gray"}}>{props.children}</b>
      </span>
    </LightTooltip>
  );
};
