/**
 * Use https://minify-js.com/ to minify it. Tried the `minify` package but did
 * not produce a small output.
 */
(() => {
  const SELECTORS = {
    BODY: 'body.mls-desktop:not(.mls-jq-modal-open)',
    OFFICE_ROWS: '.mls-js-ros-results-grid tbody tr',
    OFFICE_BUTTON: 'button.mls-js-ros-dtl-link',
    OFFICE_ADDRESS: '.mls-ros-detail-fld-lbl + a .mls-ros-dtl-office-info-div span',
    AGENT_ROWS: '.mls-ros-dtl-tbl .mls-ros-dtl-agent-alt-row',
    AGENT_CONTACT: '.mls-ros-dtl-office-names,.mls-ros-dtl-office-contact-names',
    AGENT_PHONE: '.mls-ros-dtl-office-phone-col .mls-phone-non-mobile',
    AGENT_EMAIL: '.mls-dtl-mail-to',
  };

  const appendIframe = (body, officeId) => {
    const iframeId = `tmpIframeOfficeId${officeId}`;
    const officeURL = `/MLS.Pinergy.Roster/Details?showInModal=true&officeId=${officeId}`;
    body.append(`<iframe id="${iframeId}" style="display:none" src="${officeURL}"></iframe>`);
    return $(`#${iframeId}`);
  };

  const textValue = (jqElement) => $(jqElement).text().trim();

  const addressMap = (i, jqElement) => textValue(jqElement);

  const agentMap = (officeId, officeName, streetAddress, city, state, zip) => (i, tr) =>
    [
      $(SELECTORS.AGENT_CONTACT, tr)
        .parent()
        .attr('href')
        .replace(/^.*agentId=/, '')
        .replace(/&.*/, ''),
      $(SELECTORS.AGENT_EMAIL, tr).attr('data-mailto').replace('mailto:', '').trim(),
      textValue($(SELECTORS.AGENT_CONTACT, tr)),
      textValue($(SELECTORS.AGENT_PHONE, tr)),
      officeId,
      officeName,
      streetAddress,
      city,
      state,
      zip,
      textValue($(tr).parents('table').find('thead th')),
    ].join(';');

  const toCSV = (content) => content.map((line) => line.join(';'));

  const winWrite = (newWin, content) => newWin.document.write(content);

  const newWin = window.open('', '_blank');
  const body = $(SELECTORS.BODY);

  winWrite(newWin, '<pre>');

  const allRows = $(SELECTORS.OFFICE_ROWS);
  let remainingOffices = allRows.length;

  allRows.map((i, tr) => {
    const button = $(SELECTORS.OFFICE_BUTTON, tr);
    const officeId = button.data('office-id');
    const officeName = textValue(button);

    const iframe = appendIframe(body, officeId);

    iframe.load(() => {
      const iframeContents = iframe.contents();

      const addresses = $(SELECTORS.OFFICE_ADDRESS, iframeContents).map(addressMap).get();

      const streetAddress = addresses.slice(0, addresses.length - 1).join(', ');

      const addressLastLine = addresses[addresses.length - 1];
      const [cityState, zip] = (addressLastLine || '').split(' - ');
      const [city, state] = (cityState || '').split(', ');

      const content = $(SELECTORS.AGENT_ROWS, iframeContents)
        .map(agentMap(officeId, officeName, streetAddress, city, state, zip))
        .get();
      if (content.length) {
        winWrite(newWin, `${content.join('\n')}\n`);
      }

      iframe.remove();

      remainingOffices--;
      if (remainingOffices === 0) {
        winWrite(newWin, `</pre>`);
        newWin.document.close();
      }
    });
  });
})();
