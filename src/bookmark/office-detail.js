(() => {
  iframe = $('iframe[title="Office Details"]').contents();

  office = $('.mls-page-title span span', iframe).text().trim();

  addresses = $('.mls-ros-detail-fld-lbl + a .mls-ros-dtl-office-info-div span', iframe)
    .map((i, span) => $(span).text().trim())
    .get();

  streetAddress = addresses.slice(0, addresses.length - 1).join(', ');

  addressLastLine = addresses[addresses.length - 1];
  [cityState, zip] = (addressLastLine || '').split(' - ');
  [city, state] = (cityState || '').split(', ');

  content = $('.mls-ros-dtl-tbl .mls-ros-dtl-agent-alt-row', iframe)
    .map((i, tr) => {
      return [
        $('.mls-ros-dtl-office-names,.mls-ros-dtl-office-contact-names', tr)
          .parent()
          .attr('href')
          .replace(/^.*agentId=/, '')
          .replace(/&.*/, ''),
        $('.mls-dtl-mail-to', tr).attr('data-mailto').replace('mailto:', '').trim(),
        $('.mls-ros-dtl-office-names,.mls-ros-dtl-office-contact-names', tr).text().trim(),
        $('.mls-ros-dtl-office-phone-col .mls-phone-non-mobile', tr).text().trim(),
        office,
        streetAddress,
        city,
        state,
        zip,
        $(tr).parents('table').find('thead th').text().trim(),
      ].join(';');
    })
    .get()
    .join('\n');

  newWin = window.open('', '_blank');
  newWin.document.write(`<pre>${content}</pre>`);
  newWin.document.close();
})();
