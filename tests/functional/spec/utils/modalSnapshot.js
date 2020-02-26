const modalSnapshot = (testNameParts, viewport, image, account) => {
    const _testNameParts = testNameParts.replace(/( )/g, '-');
    const customSnapshotIdentifier = `${_testNameParts}-${viewport.width}`;
    const locale = account.includes('IAZ') ? 'DE' : 'US';
    expect(image).toMatchImageSnapshot({
        customSnapshotsDir: `./tests/functional/snapshots/${locale}/${account}/modal`,
        customSnapshotIdentifier
    });
};

export default modalSnapshot;
