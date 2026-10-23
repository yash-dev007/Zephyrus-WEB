const rows = Array.from(document.querySelectorAll<HTMLDetailsElement>('details[data-ledger]'));

if (rows.length) {
  document.addEventListener(
    'toggle',
    (event) => {
      const current = event.target;
      if (!(current instanceof HTMLDetailsElement)) return;
      if (!current.open || !current.matches('details[data-ledger]')) return;

      for (const row of rows) {
        if (row !== current && row.open) row.open = false;
      }
    },
    true,
  );
}
