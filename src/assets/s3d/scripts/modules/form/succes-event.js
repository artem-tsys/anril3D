function SuccesEvent() {
  const event = new Event('succes', {
  });
  return {
    event,
    dispatch: (el) => {
      el.dispatchEvent(event);
    },
    name: event.type,
  };
}

export default SuccesEvent();
