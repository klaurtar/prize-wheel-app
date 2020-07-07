const DialogManager = (function () {
  const $dialogContainerElement = document.createElement('div');
  $dialogContainerElement.className = 'topLevelDialogContainer';
  document.body.appendChild($dialogContainerElement);

  function createDialog(msg) {
    const dialog = new Dialog();
    const $dialogElement = dialog.getDialogElement();
    $dialogContainerElement.appendChild($dialogElement);
    dialog.$body.innerHTML = msg;
    dialog.open();
    return dialog;
  }

  EventManager.subscribe('prizeWheelWinOrLose', createDialog);
})();
