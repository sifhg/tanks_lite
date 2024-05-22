const StageNavigators = {
  offset: (
    newOffset: { x: number; y: number },
    setStageOffset: (stageOffset: { x: number; y: number }) => void
  ): void => {
    setStageOffset(newOffset);
  },
  zoom: (
    newZoomFactor: number,
    anchorPointX: number,
    anchorPointY: number,
    oldZoomFactor: number,
    setZoomFactor: (zoomFactor: number) => void,
    stageOffset: { x: number; y: number },
    setStageOffset: (stageOffset: { x: number; y: number }) => void
  ): void => {
    const zoomFactorDiff = oldZoomFactor / newZoomFactor;

    // Calculate the zoom offset based on the anchor point and current stage offset
    const zoomOffsetX = (anchorPointX - stageOffset.x) * (1 - zoomFactorDiff);
    const zoomOffsetY = (anchorPointY - stageOffset.y) * (1 - zoomFactorDiff);

    // Calculate the new stage offset based on the zoom offset and previous offset
    const newOffsetX = stageOffset.x + zoomOffsetX;
    const newOffsetY = stageOffset.y + zoomOffsetY;

    setZoomFactor(newZoomFactor);
    setStageOffset({ x: newOffsetX, y: newOffsetY });
  },
  abs2rel: (
    absX: number,
    absY: number,
    zoomFactor: number,
    stageOffset: { x: number; y: number }
  ): { x: number; y: number } => {
    // Invert the zoom factor
    const invZoomFactor = 1 / zoomFactor;

    // Apply the inverse zoom factor and subtract the stage offset
    const relX = absX * invZoomFactor + stageOffset.x;
    const relY = absY * invZoomFactor + stageOffset.y;

    return { x: relX, y: relY };
  },
};

export default StageNavigators;
