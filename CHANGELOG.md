# Changelog

## [1.43.0](https://github.com/paypal/paypal-messaging-components/compare/v1.42.0...v1.43.0) (2023-06-14)


### Features

* Update UK Pi3 Legal Disclosure (DTCRCMERC-2267) ([#936](https://github.com/paypal/paypal-messaging-components/issues/936)) ([a186771](https://github.com/paypal/paypal-messaging-components/commit/a1867714a4e69efd3c54d0d80976ce46356f3528))


### Bug Fixes

* add cookie global ([#951](https://github.com/paypal/paypal-messaging-components/issues/951)) ([a12ebb3](https://github.com/paypal/paypal-messaging-components/commit/a12ebb3ebbb47b2e3f65315a2236fed875ea55ee))


### Build System

* remove old stage bundle url ([#947](https://github.com/paypal/paypal-messaging-components/issues/947)) ([c669016](https://github.com/paypal/paypal-messaging-components/commit/c66901698ad0525b75916749f61ba0043f6cdabe))


### Continuous Integration

* Github action workflow npm publish ([#923](https://github.com/paypal/paypal-messaging-components/issues/923)) ([0e38156](https://github.com/paypal/paypal-messaging-components/commit/0e381568d27c0060ed174ee105b839fef7f47634))
* remove use of deprecated set-output command ([#938](https://github.com/paypal/paypal-messaging-components/issues/938)) ([9ef6eb0](https://github.com/paypal/paypal-messaging-components/commit/9ef6eb06e77187a037b5141973dbe72ef2f37eab))


### Code Refactoring

* chunk multi-message rendering to prevent singular long task ([#939](https://github.com/paypal/paypal-messaging-components/issues/939)) ([9b1a240](https://github.com/paypal/paypal-messaging-components/commit/9b1a2408db4fffd150033dcd25c1d5eb02f5422f))
* remove NE from US Pay Monthly modal legal disclosure ([#906](https://github.com/paypal/paypal-messaging-components/issues/906)) ([eb9ffb0](https://github.com/paypal/paypal-messaging-components/commit/eb9ffb0ee187ff41ab4494b33049e00dd6f3ff21))

## [1.42.0](https://github.com/paypal/paypal-messaging-components/compare/v1.41.0...v1.42.0) (2023-05-11)


### Features

* support PL2GO and the PL Hub in the universal modal ([#922](https://github.com/paypal/paypal-messaging-components/issues/922)) ([c438325](https://github.com/paypal/paypal-messaging-components/commit/c43832586833b874266828856f597357f8993f24))
* Update Error States for US Pay Monthly and DE LT modals for Accessibility (DTCRCMERC-2260) ([#933](https://github.com/paypal/paypal-messaging-components/issues/933)) ([a0470f2](https://github.com/paypal/paypal-messaging-components/commit/a0470f29592e732939805a71b5b172a70b8f873e))


### Code Refactoring

* add 0% TAEG to IT Pi3 messages and modals ([#929](https://github.com/paypal/paypal-messaging-components/issues/929)) ([81abc19](https://github.com/paypal/paypal-messaging-components/commit/81abc19404a140dd12389e91adb77342c4427606))
* improve modal screen reader accessibility ([#926](https://github.com/paypal/paypal-messaging-components/issues/926)) ([fcb57bd](https://github.com/paypal/paypal-messaging-components/commit/fcb57bdb3829093d74abfef6b98cb35c5f5bbf1b))
* update APR values in modal DE Long Term legal disclosure ([#930](https://github.com/paypal/paypal-messaging-components/issues/930)) ([54b59d6](https://github.com/paypal/paypal-messaging-components/commit/54b59d618484b7ce7013a262c1e0829a09488350))


### Continuous Integration

* tweak permissions [skip ci] ([d6c001b](https://github.com/paypal/paypal-messaging-components/commit/d6c001b5ed28b25298e132a3c3b2079e159d6c66))

## [1.41.0](https://github.com/paypal/paypal-messaging-components/compare/v1.40.4...v1.41.0) (2023-04-18)


### Features

* support PL2GO and the PL Hub in the universal modal ([#922](https://github.com/paypal/paypal-messaging-components/issues/922)) ([#924](https://github.com/paypal/paypal-messaging-components/issues/924)) ([6c1de75](https://github.com/paypal/paypal-messaging-components/commit/6c1de7556d8df017f88219fa74936ae9dda5e4ba))

### [1.40.4](https://github.com/paypal/paypal-messaging-components/compare/v1.40.3...v1.40.4) (2023-04-04)


### Bug Fixes

* improve modal calculator long floating point amounts ([#920](https://github.com/paypal/paypal-messaging-components/issues/920)) ([37e10e1](https://github.com/paypal/paypal-messaging-components/commit/37e10e10a997d1f7e4ff8de77ec68fa0b7323869))
* intersection observer overflow and element calculations  ([#918](https://github.com/paypal/paypal-messaging-components/issues/918)) ([bc12e53](https://github.com/paypal/paypal-messaging-components/commit/bc12e538cc88c27e62d69ecd74f4dcf4aef146c2))
* Screen Reader Amounts in US Messages Read Incorrectly ([#915](https://github.com/paypal/paypal-messaging-components/issues/915)) ([ba954b9](https://github.com/paypal/paypal-messaging-components/commit/ba954b996ec5d0d4a6cab3a33d4e31e93ff3faee))

### [1.40.3](https://github.com/paypal/paypal-messaging-components/compare/v1.40.2...v1.40.3) (2023-03-14)


### Bug Fixes

* hide mobile header image from modal (DTCRCMERC-2171) ([#914](https://github.com/paypal/paypal-messaging-components/issues/914)) ([3193359](https://github.com/paypal/paypal-messaging-components/commit/3193359458dfee591b605dc7404711a27391182b))


### Code Refactoring

* update overflow detection algorithm to allow for messages that are 100% hidden ([#913](https://github.com/paypal/paypal-messaging-components/issues/913)) ([e42dda4](https://github.com/paypal/paypal-messaging-components/commit/e42dda462eae3dedb85de8c09f5fe630a1c5ffe8))

### [1.40.2](https://github.com/paypal/paypal-messaging-components/compare/v1.40.1...v1.40.2) (2023-03-06)


### Bug Fixes

* Accessibility Issue: Messages Space Issue for Screen Reader (DTCRCMERC-1897) ([#907](https://github.com/paypal/paypal-messaging-components/issues/907)) ([3e0bef5](https://github.com/paypal/paypal-messaging-components/commit/3e0bef59c810969c98518845f3a6467bd1876c7f))
* prevent ScrollProvider from causing unnecessary rerender ([#899](https://github.com/paypal/paypal-messaging-components/issues/899)) ([32a5575](https://github.com/paypal/paypal-messaging-components/commit/32a557564cf58b47a8ae91c05df009f2055d1b9b))
* Screen Reader Issue Messages Paypal Logo (DTCRCMERC-1899) ([#909](https://github.com/paypal/paypal-messaging-components/issues/909)) ([47694bf](https://github.com/paypal/paypal-messaging-components/commit/47694bf82f5269cb7d9d082eb1c989310031c577))


### Code Refactoring

* support APR disclaimer from modal offers content ([#911](https://github.com/paypal/paypal-messaging-components/issues/911)) ([ab01526](https://github.com/paypal/paypal-messaging-components/commit/ab01526b3b0a2a2b77c9e704d058f493d99f34bb))

### [1.40.1](https://github.com/paypal/paypal-messaging-components/compare/v1.40.0...v1.40.1) (2023-02-08)


### Bug Fixes

* send treatments hash on message update ([#902](https://github.com/paypal/paypal-messaging-components/issues/902)) ([9f4de0b](https://github.com/paypal/paypal-messaging-components/commit/9f4de0b25d5d3c2787a63e26856df1027b2fad93))

## [1.40.0](https://github.com/paypal/paypal-messaging-components/compare/v1.39.5...v1.40.0) (2023-01-31)


### Features

* support edge-cached consumer-based experimentation ([#796](https://github.com/paypal/paypal-messaging-components/issues/796)) ([3626552](https://github.com/paypal/paypal-messaging-components/commit/36265522bce0592231dacbfb9763c66b7ed8db83))


### Bug Fixes

* ensure empty string for undefined message rerender ([#897](https://github.com/paypal/paypal-messaging-components/issues/897)) ([10768aa](https://github.com/paypal/paypal-messaging-components/commit/10768aaf1668aa3afffb8521f75562bd62a27701))
* prevent DE LT view from displaying product list tiles ([#898](https://github.com/paypal/paypal-messaging-components/issues/898)) ([5ff9370](https://github.com/paypal/paypal-messaging-components/commit/5ff937040caac33fe53c3c42e8da6c4c9ed12ff4))

### [1.39.5](https://github.com/paypal/paypal-messaging-components/compare/v1.39.4...v1.39.5) (2023-01-24)


### Bug Fixes

* 3.0 modal font bolding ([#891](https://github.com/paypal/paypal-messaging-components/issues/891)) ([33cf776](https://github.com/paypal/paypal-messaging-components/commit/33cf7767ecb8bd483df57268974c01ad233c7160))
* universal modal lander scroll on mobile ([#892](https://github.com/paypal/paypal-messaging-components/issues/892)) ([4770a56](https://github.com/paypal/paypal-messaging-components/commit/4770a56dee7d20ae046f4d05797b82790ea6955e))


### Code Refactoring

* add screen reader text to Pay in 4 ([#883](https://github.com/paypal/paypal-messaging-components/issues/883)) ([4630482](https://github.com/paypal/paypal-messaging-components/commit/46304820bef643197ecd3643932c26bf74495ab9))
* cleanup old DE Installments ([#871](https://github.com/paypal/paypal-messaging-components/issues/871)) ([6062a18](https://github.com/paypal/paypal-messaging-components/commit/6062a18077173da527dfc5cba5f88abe7f5fed0c))

### [1.39.4](https://github.com/paypal/paypal-messaging-components/compare/v1.39.3...v1.39.4) (2023-01-17)


### Code Refactoring

* IT Pay in 3 modal "Remove Dopo" update (DTCRCMERC-1860) ([#893](https://github.com/paypal/paypal-messaging-components/issues/893)) ([4d57c50](https://github.com/paypal/paypal-messaging-components/commit/4d57c50585f74b27007e95fe3da5db952ecfb503))
* tweak styles to remove padding-right from messages ([#886](https://github.com/paypal/paypal-messaging-components/issues/886)) ([d24e3d8](https://github.com/paypal/paypal-messaging-components/commit/d24e3d8ff7a736e581ab47f6dda193bf986b47a6))

### [1.39.3](https://github.com/paypal/paypal-messaging-components/compare/v1.39.2...v1.39.3) (2023-01-10)


### Build System

* fix optional args ([#890](https://github.com/paypal/paypal-messaging-components/issues/890)) ([b7086f7](https://github.com/paypal/paypal-messaging-components/commit/b7086f7cd0f79fb3eac9d5ac69e63ea2ee0a939e))


### Code Refactoring

* ES non-qualifying message wrapping logic ([#876](https://github.com/paypal/paypal-messaging-components/issues/876)) ([5f6dcbe](https://github.com/paypal/paypal-messaging-components/commit/5f6dcbeef46a1bc641e094698b650c30c15f08e3))
* message banner accessibility tasks (DTCRCMERC-1788) ([#869](https://github.com/paypal/paypal-messaging-components/issues/869)) ([8254b36](https://github.com/paypal/paypal-messaging-components/commit/8254b3686fe9082a7f525554a6b617e8a5bfccb3))
* underline "Learn More" link in message for text color = "black" (DTCRCMERC-1754) ([#887](https://github.com/paypal/paypal-messaging-components/issues/887)) ([aa32a33](https://github.com/paypal/paypal-messaging-components/commit/aa32a332d21d69268c08bc1446344de5b0c08485))

### [1.39.2](https://github.com/paypal/paypal-messaging-components/compare/v1.39.1...v1.39.2) (2022-12-07)


### Bug Fixes

* donut amount screen reader issue ([#888](https://github.com/paypal/paypal-messaging-components/issues/888)) ([7f281be](https://github.com/paypal/paypal-messaging-components/commit/7f281be352770696317d2bfe813020547a8e19f3))
* inline and none for LT MQGZ message to account for updated 0% FR campaign content ([#884](https://github.com/paypal/paypal-messaging-components/issues/884)) ([d404550](https://github.com/paypal/paypal-messaging-components/commit/d404550a75a4ba555b972f16fab4e488a29031f2))
* NQ US Pay Monthly message in Alternative style not wrapping (DTCRCMERC-1861) ([#882](https://github.com/paypal/paypal-messaging-components/issues/882)) ([c7d91e1](https://github.com/paypal/paypal-messaging-components/commit/c7d91e18e44b1d67ae06a7419c9ada18dffeedea))
* update LT MQGZ wrapping logic to support longer FR campaign message content ([#881](https://github.com/paypal/paypal-messaging-components/issues/881)) ([8d44498](https://github.com/paypal/paypal-messaging-components/commit/8d44498e1045e8a4cd0143c9c68b477ee2d7a1f9))

### [1.39.1](https://github.com/paypal/paypal-messaging-components/compare/v1.39.0...v1.39.1) (2022-11-15)


### Code Refactoring

* add dash for pay monthly checkout content ([#878](https://github.com/paypal/paypal-messaging-components/issues/878)) ([2966866](https://github.com/paypal/paypal-messaging-components/commit/29668666170aaad18ad6f393b559fe06214cf4f8))
* adjust LT MQGZ style for inline and none ([#877](https://github.com/paypal/paypal-messaging-components/issues/877)) ([02c66b4](https://github.com/paypal/paypal-messaging-components/commit/02c66b450f7ad7f6fb3c7a34e18dee3174521e0f))
* modal accessibility issues (DTCRCMERC-1728) ([#856](https://github.com/paypal/paypal-messaging-components/issues/856)) ([684245b](https://github.com/paypal/paypal-messaging-components/commit/684245b0550b187364e177532cad1dfdc99c137b))

## [1.39.0](https://github.com/paypal/paypal-messaging-components/compare/v1.38.3...v1.39.0) (2022-11-08)


### Features

* 3.0 rebrand ([#873](https://github.com/paypal/paypal-messaging-components/issues/873)) ([9336ec7](https://github.com/paypal/paypal-messaging-components/commit/9336ec78dc8a54ccaf8620da0dc2c7a77de04bb8))
* modal in iframe popup support ([#874](https://github.com/paypal/paypal-messaging-components/issues/874)) ([0e13d8c](https://github.com/paypal/paypal-messaging-components/commit/0e13d8c3e7b310e0e49178d4dea0b5fbc9292e28))

### [1.38.3](https://github.com/paypal/paypal-messaging-components/compare/v1.38.2...v1.38.3) (2022-10-25)


### Code Refactoring

* pass customerId and deviceID to modalContent requests ([#866](https://github.com/paypal/paypal-messaging-components/issues/866)) ([a880be9](https://github.com/paypal/paypal-messaging-components/commit/a880be9ab3d9fdc54a8d39684540ac267b1a32af))

### [1.38.2](https://github.com/paypal/paypal-messaging-components/compare/v1.38.1...v1.38.2) (2022-10-11)


### Bug Fixes

* update modals for legal disclosure not showing in the mobile viewport (DTCRCMERC-1565) ([#842](https://github.com/paypal/paypal-messaging-components/issues/842)) ([82577d1](https://github.com/paypal/paypal-messaging-components/commit/82577d1e563907e59ca170d01bbd210ca346ed28))

### [1.38.1](https://github.com/paypal/paypal-messaging-components/compare/v1.38.0...v1.38.1) (2022-10-03)


### Bug Fixes

* add channel to message updates ([#852](https://github.com/paypal/paypal-messaging-components/issues/852)) ([8122e45](https://github.com/paypal/paypal-messaging-components/commit/8122e45021d170b82c562c4f8bc4551fdc5833a2))

## [1.38.0](https://github.com/paypal/paypal-messaging-components/compare/v1.37.1...v1.38.0) (2022-09-27)


### Features

* add support for ec_token param ([#848](https://github.com/paypal/paypal-messaging-components/issues/848)) ([9ba7f1c](https://github.com/paypal/paypal-messaging-components/commit/9ba7f1c9def8762ab41c3f03c80e465d7cffb6cb))


### Code Refactoring

* Update Pay in 4 modal to remove ND from ineligible states disclosure (DTCRCMERC-1720) ([#855](https://github.com/paypal/paypal-messaging-components/issues/855)) ([4e76c40](https://github.com/paypal/paypal-messaging-components/commit/4e76c40cb69ce58b6286cbb4ace11a29a258b452))
* Update Pay Monthly modal disclosure for Vermont & South Dakota (DTCRCMERC-1719) ([#853](https://github.com/paypal/paypal-messaging-components/issues/853)) ([f0f7716](https://github.com/paypal/paypal-messaging-components/commit/f0f77166b0699a746d386f759fd07d460b0ac275))

### [1.37.1](https://github.com/paypal/paypal-messaging-components/compare/v1.37.0...v1.37.1) (2022-09-21)


### Bug Fixes

* universal modal lander header stickiness on mobile ([#850](https://github.com/paypal/paypal-messaging-components/issues/850)) ([057f851](https://github.com/paypal/paypal-messaging-components/commit/057f851841d7eed03b1807ca4f154c0514473312))

## [1.37.0](https://github.com/paypal/paypal-messaging-components/compare/v1.36.4...v1.37.0) (2022-08-30)


### Features

* Updates to DE no amount message (DTCRCMERC-1600) ([#846](https://github.com/paypal/paypal-messaging-components/issues/846)) ([ac72e09](https://github.com/paypal/paypal-messaging-components/commit/ac72e094d7629ca8e31c1ebb4201be35877e7772))


### Code Refactoring

* Updated stats payload to include render & request duration (DTCRCGEMI-360) ([#838](https://github.com/paypal/paypal-messaging-components/issues/838)) ([402666d](https://github.com/paypal/paypal-messaging-components/commit/402666dbea9d82c9de506b0c40c09854ee41e229))

### [1.36.4](https://github.com/paypal/paypal-messaging-components/compare/v1.36.3...v1.36.4) (2022-08-16)


### Bug Fixes

* remove shimmer boxes for non-qualifying amounts ([#843](https://github.com/paypal/paypal-messaging-components/issues/843)) ([e30cbb8](https://github.com/paypal/paypal-messaging-components/commit/e30cbb825e931e102c9e3791e18ac96304e15f43))


### Continuous Integration

* fix unzip security ([#844](https://github.com/paypal/paypal-messaging-components/issues/844)) ([ad5ab33](https://github.com/paypal/paypal-messaging-components/commit/ad5ab3317925efbe7aacbf063d0fbe3d60600576))

### [1.36.3](https://github.com/paypal/paypal-messaging-components/compare/v1.36.2...v1.36.3) (2022-08-02)


### Bug Fixes

* message period spacing ([#840](https://github.com/paypal/paypal-messaging-components/issues/840)) ([546a04f](https://github.com/paypal/paypal-messaging-components/commit/546a04f30369284cbcd8f07aa60027f49577be55))


### Code Refactoring

* € is on the same line as the min and max purchase ([#839](https://github.com/paypal/paypal-messaging-components/issues/839)) ([2afc6f0](https://github.com/paypal/paypal-messaging-components/commit/2afc6f0e2b31118a44a4c44346d99b0cf39ca012))

### [1.36.2](https://github.com/paypal/paypal-messaging-components/compare/v1.36.1...v1.36.2) (2022-07-19)


### Bug Fixes

* snapshotCommit workflow ([#835](https://github.com/paypal/paypal-messaging-components/issues/835)) ([3ec72ba](https://github.com/paypal/paypal-messaging-components/commit/3ec72ba1a69ff172260f949db7d759be832886a1))
* update ES message disclosure ([#833](https://github.com/paypal/paypal-messaging-components/issues/833)) ([955969a](https://github.com/paypal/paypal-messaging-components/commit/955969a5d012d53c84468e24fb01122052bb3c6f))
* workflows ([#832](https://github.com/paypal/paypal-messaging-components/issues/832)) ([ba23792](https://github.com/paypal/paypal-messaging-components/commit/ba237920734b252c23cedde8ffa7f33b336f5cd6))


### Code Refactoring

* send integration type ([#834](https://github.com/paypal/paypal-messaging-components/issues/834)) ([0d88d3a](https://github.com/paypal/paypal-messaging-components/commit/0d88d3a6c3a6e6d5750f9a5c30b81e5912eae578))

### [1.36.1](https://github.com/paypal/paypal-messaging-components/compare/v1.36.0...v1.36.1) (2022-06-29)


### Bug Fixes

* account for getStandardProductOffer return value from standalone modal ([#828](https://github.com/paypal/paypal-messaging-components/issues/828)) ([b506648](https://github.com/paypal/paypal-messaging-components/commit/b506648e49700bc1deaac5abeef479dc5c4ea73c))
* meta viewport restoration ([#829](https://github.com/paypal/paypal-messaging-components/issues/829)) ([8453add](https://github.com/paypal/paypal-messaging-components/commit/8453addafe6e9b130e84bb184fc75df6ad6d6df7))
* prevent universal modal view switching on window resize ([#784](https://github.com/paypal/paypal-messaging-components/issues/784)) ([6b13457](https://github.com/paypal/paypal-messaging-components/commit/6b13457d4046a227c5c49546406dfde2f8f39fde))


### Code Refactoring

* enhance offer param to support more offers ([#773](https://github.com/paypal/paypal-messaging-components/issues/773)) ([67404d8](https://github.com/paypal/paypal-messaging-components/commit/67404d87918057c0d4cbf899e09749d8e372b908))

## [1.36.0](https://github.com/paypal/paypal-messaging-components/compare/v1.35.0...v1.36.0) (2022-06-14)


### Features

* add DE universal modal views ([#821](https://github.com/paypal/paypal-messaging-components/issues/821)) ([b277cbd](https://github.com/paypal/paypal-messaging-components/commit/b277cbd926473cd6a4d6ced4d1b06aea26eed150))


### Code Refactoring

* address IT Pi3 donut alignment issue ([#826](https://github.com/paypal/paypal-messaging-components/issues/826)) ([1db2cf0](https://github.com/paypal/paypal-messaging-components/commit/1db2cf0ace11b197e8903fdf3aea54fc16073fab))

## [1.35.0](https://github.com/paypal/paypal-messaging-components/compare/v1.34.6...v1.35.0) (2022-06-08)


### Features

* US Pay Monthly ([#820](https://github.com/paypal/paypal-messaging-components/issues/820)) ([7206fb9](https://github.com/paypal/paypal-messaging-components/commit/7206fb962312c5dde9d83af8a3719436c8fe6160))


### Bug Fixes

* adds 's' to 'fee' in US Pi4 subheadline ([#822](https://github.com/paypal/paypal-messaging-components/issues/822)) ([347fc23](https://github.com/paypal/paypal-messaging-components/commit/347fc233d6ed1b7de07355e6b07724611068ab87))
* learn more modal close button a11y ([#815](https://github.com/paypal/paypal-messaging-components/issues/815)) ([db443bc](https://github.com/paypal/paypal-messaging-components/commit/db443bcf1da8ebb6869edb02c74f51795f0a8964))
* US non-qualifying Pay in 4 message being cut off ([#816](https://github.com/paypal/paypal-messaging-components/issues/816)) ([ad382f9](https://github.com/paypal/paypal-messaging-components/commit/ad382f99c871b2675a177201d53f8148125ab6c7))


### Code Refactoring

* US Product List modal content update ([#818](https://github.com/paypal/paypal-messaging-components/issues/818)) ([da8d8fd](https://github.com/paypal/paypal-messaging-components/commit/da8d8fd1c2e68af91453d3ff9baa7c597bf3fc9f))

### [1.34.6](https://github.com/paypal/paypal-messaging-components/compare/v1.34.5...v1.34.6) (2022-06-01)


### Bug Fixes

* Adds merchantConfigHash to the query parameters on subsequent re-renders of message ([#817](https://github.com/paypal/paypal-messaging-components/issues/817)) ([d706275](https://github.com/paypal/paypal-messaging-components/commit/d706275a570bb4c64e91af15476d7e5589ae719f))
* edge caching TS cookie ([#799](https://github.com/paypal/paypal-messaging-components/issues/799)) ([855ca67](https://github.com/paypal/paypal-messaging-components/commit/855ca670022afd3d0a4244fd013a433252ddcf43))


### Tests

* update DEV_US_MULTI functional test and config ([#814](https://github.com/paypal/paypal-messaging-components/issues/814)) ([f20b14a](https://github.com/paypal/paypal-messaging-components/commit/f20b14ab2a493c56b764bc3563274336328c5661))

### [1.34.5](https://github.com/paypal/paypal-messaging-components/compare/v1.34.4...v1.34.5) (2022-05-18)


### Bug Fixes

* pass user onShow to modal zoid component ([#808](https://github.com/paypal/paypal-messaging-components/issues/808)) ([3b3eb94](https://github.com/paypal/paypal-messaging-components/commit/3b3eb94e7db812329ed460edac54086e4a77e25a))
* remove unneeded ampersand ([#812](https://github.com/paypal/paypal-messaging-components/issues/812)) ([f8c7e70](https://github.com/paypal/paypal-messaging-components/commit/f8c7e70cd33bd534a7c9a94f2bcc9988e37c86a0))


### Code Refactoring

* clean up US product list modal view backwards compatibility logic ([#811](https://github.com/paypal/paypal-messaging-components/issues/811)) ([25b2c92](https://github.com/paypal/paypal-messaging-components/commit/25b2c92ef995f01bb3b472547cba3b2c4e90bb7d))
* Update DE Installments legal disclosure to use new version of the PAngV ([#810](https://github.com/paypal/paypal-messaging-components/issues/810)) ([f95b912](https://github.com/paypal/paypal-messaging-components/commit/f95b9124835da3fa0b1f3498dc888d560b3a8b7d))

### [1.34.4](https://github.com/paypal/paypal-messaging-components/compare/v1.34.3...v1.34.4) (2022-05-03)


### Bug Fixes

* hasInstallments null length ([#806](https://github.com/paypal/paypal-messaging-components/issues/806)) ([bc9787f](https://github.com/paypal/paypal-messaging-components/commit/bc9787f3422c12d8fd8cbace88dce8aa0b0c3a18))

### [1.34.3](https://github.com/paypal/paypal-messaging-components/compare/v1.34.2...v1.34.3) (2022-05-03)


### Bug Fixes

* adds missing clientId and partnerClientId missing on stats event ([#790](https://github.com/paypal/paypal-messaging-components/issues/790)) ([9c742ed](https://github.com/paypal/paypal-messaging-components/commit/9c742ed7754f2fcf9cc63e172dcdfd27919e8bb9))
* adjust GPLNQ mutations to accommodate purchase range ([#800](https://github.com/paypal/paypal-messaging-components/issues/800)) ([dc67fa3](https://github.com/paypal/paypal-messaging-components/commit/dc67fa3c5ae544640c0896f49b054abf04c6155f))


### Code Refactoring

* update product modal ([#779](https://github.com/paypal/paypal-messaging-components/issues/779)) ([31a535c](https://github.com/paypal/paypal-messaging-components/commit/31a535c9a720d1ff1673036b844e83718b64e8e6))
* use estimated installments ([#795](https://github.com/paypal/paypal-messaging-components/issues/795)) ([6a7b2e6](https://github.com/paypal/paypal-messaging-components/commit/6a7b2e62cd9d881ac29822b774cb00b3306c418a))

### [1.34.2](https://github.com/paypal/paypal-messaging-components/compare/v1.34.1...v1.34.2) (2022-04-12)


### Code Refactoring

* FR and GB content and mutation files cleanup ([#792](https://github.com/paypal/paypal-messaging-components/issues/792)) ([766fb36](https://github.com/paypal/paypal-messaging-components/commit/766fb363e252c1dd3431c25da8777f1f2d236340))
* lander index for instrumentation ([#761](https://github.com/paypal/paypal-messaging-components/issues/761)) ([064e860](https://github.com/paypal/paypal-messaging-components/commit/064e860a7e2a7bfa91efe2243c2f504b71553d7a))
* use common Pay in 1 offer value ([#763](https://github.com/paypal/paypal-messaging-components/issues/763)) ([9accad4](https://github.com/paypal/paypal-messaging-components/commit/9accad4c59012c17217e0c6024f3ecab52ea1133))

### [1.34.1](https://github.com/paypal/paypal-messaging-components/compare/v1.34.0...v1.34.1) (2022-04-06)


### Bug Fixes

* duplicate stats events ([#776](https://github.com/paypal/paypal-messaging-components/issues/776)) ([16907bf](https://github.com/paypal/paypal-messaging-components/commit/16907bfe13b5e4d188a0d1497d35ffdd204adc26))
* remove comma in ES inline/none logo types ([#786](https://github.com/paypal/paypal-messaging-components/issues/786)) ([083f970](https://github.com/paypal/paypal-messaging-components/commit/083f9708b2fae261433d0bff63d51e135a6f7afe))
* replace EUR with euro symbol ([#788](https://github.com/paypal/paypal-messaging-components/issues/788)) ([98d79dd](https://github.com/paypal/paypal-messaging-components/commit/98d79dd6c9f2525858d2fe68ce0e139d0b344cc4))
* use mrid from within iframe to handle updates correctly ([#752](https://github.com/paypal/paypal-messaging-components/issues/752)) ([0b43ede](https://github.com/paypal/paypal-messaging-components/commit/0b43ede500ed37b7b0164e12c993722dba6ee623))


### Code Refactoring

* logo alignment and style consolidation ([#762](https://github.com/paypal/paypal-messaging-components/issues/762)) ([5f0bb12](https://github.com/paypal/paypal-messaging-components/commit/5f0bb12dc7aac8b3fe306385dd0491906270a53f))
* show eligible purchase range in non-qualifying US Pay in 4 message ([#765](https://github.com/paypal/paypal-messaging-components/issues/765)) ([016a0a1](https://github.com/paypal/paypal-messaging-components/commit/016a0a10c99ea263a1e0651c7622e9c103f1af42))
* update UK universal modal legal disclosure  ([#780](https://github.com/paypal/paypal-messaging-components/issues/780)) ([262e826](https://github.com/paypal/paypal-messaging-components/commit/262e8265a17306c2a4b32fd771ea602151aff16f))

## [1.34.0](https://github.com/paypal/paypal-messaging-components/compare/v1.33.0...v1.34.0) (2022-03-29)


### Features

* AU universal modal ([#758](https://github.com/paypal/paypal-messaging-components/issues/758)) ([9d5808b](https://github.com/paypal/paypal-messaging-components/commit/9d5808b0041527c5764fa66c1ddbb6e09de51264))
* FR universal modal ([#767](https://github.com/paypal/paypal-messaging-components/issues/767)) ([2c042e3](https://github.com/paypal/paypal-messaging-components/commit/2c042e322f48508bd9a5461712fd9dd9461360a7))


### Bug Fixes

* update PPC view styles to show more legal text above the fold ([#777](https://github.com/paypal/paypal-messaging-components/issues/777)) ([476e8d7](https://github.com/paypal/paypal-messaging-components/commit/476e8d78c279878de796ca19a3c3c7f069808f6a))

## [1.33.0](https://github.com/paypal/paypal-messaging-components/compare/v1.32.0...v1.33.0) (2022-03-22)


### Features

* GB Pay in 3 universal modal ([#737](https://github.com/paypal/paypal-messaging-components/issues/737)) ([466be7c](https://github.com/paypal/paypal-messaging-components/commit/466be7c304adf94b1cbf7053a63fb53b005adddc))
* update UK message to include purchase range ([#736](https://github.com/paypal/paypal-messaging-components/issues/736)) ([459f7c9](https://github.com/paypal/paypal-messaging-components/commit/459f7c90fb9cc140768c271c30e0289c4c36beb1))


### Bug Fixes

* gb mutation for inline and none ([#772](https://github.com/paypal/paypal-messaging-components/issues/772)) ([cd5a472](https://github.com/paypal/paypal-messaging-components/commit/cd5a4727d00aa69abc506aafd217a8f2515250ca))


### Code Refactoring

* amplitude parity ([#642](https://github.com/paypal/paypal-messaging-components/issues/642)) ([c992186](https://github.com/paypal/paypal-messaging-components/commit/c99218670c89d23ffee9dedf0e9b98e1b5712dea))
* update FR message to include purchase range ([#738](https://github.com/paypal/paypal-messaging-components/issues/738)) ([74eb2cf](https://github.com/paypal/paypal-messaging-components/commit/74eb2cf34fc3ce5c6be84efc07c7215fe757ddbb))

## [1.32.0](https://github.com/paypal/paypal-messaging-components/compare/v1.31.0...v1.32.0) (2022-03-16)


### Features

* support cspNonce param ([#740](https://github.com/paypal/paypal-messaging-components/issues/740)) ([eefce03](https://github.com/paypal/paypal-messaging-components/commit/eefce03f3251b6fed06ecebd6edf332e9aabf110))


### Bug Fixes

* add cross-border DE messages ([#768](https://github.com/paypal/paypal-messaging-components/issues/768)) ([5ee39ed](https://github.com/paypal/paypal-messaging-components/commit/5ee39ed553383a818f88b277184432f84f1fdef2))
* use 1rem for donut payment and timestamp across all viewports ([#769](https://github.com/paypal/paypal-messaging-components/issues/769)) ([f43780e](https://github.com/paypal/paypal-messaging-components/commit/f43780ea853d44a89459a6d89b8fd0da984fee0d))


### Code Refactoring

* remove short-term min and max cents ([#756](https://github.com/paypal/paypal-messaging-components/issues/756)) ([b4736a3](https://github.com/paypal/paypal-messaging-components/commit/b4736a30974a1f41a7ac37a3c1e9c1d12fec9ad2))

## [1.31.0](https://github.com/paypal/paypal-messaging-components/compare/v1.30.1...v1.31.0) (2022-03-09)


### Features

* adds ES-PI3 messages, flex, and modal ([#755](https://github.com/paypal/paypal-messaging-components/issues/755)) ([3039c8c](https://github.com/paypal/paypal-messaging-components/commit/3039c8c257725364af2ce019f241acf20a388685)), closes [#691](https://github.com/paypal/paypal-messaging-components/issues/691) [#733](https://github.com/paypal/paypal-messaging-components/issues/733)
* GitHub Actions for Universal Modal ([#731](https://github.com/paypal/paypal-messaging-components/issues/731)) ([73ece62](https://github.com/paypal/paypal-messaging-components/commit/73ece6207b508bc69a10477b7dd32e15d686ce23))
* IT-Pi3 text, flex, and modal ([#759](https://github.com/paypal/paypal-messaging-components/issues/759)) ([44816cd](https://github.com/paypal/paypal-messaging-components/commit/44816cd6c964e62a2a6776915b6b3ed599b6ba17)), closes [#660](https://github.com/paypal/paypal-messaging-components/issues/660) [#656](https://github.com/paypal/paypal-messaging-components/issues/656) [#665](https://github.com/paypal/paypal-messaging-components/issues/665) [#686](https://github.com/paypal/paypal-messaging-components/issues/686) [#712](https://github.com/paypal/paypal-messaging-components/issues/712) [#689](https://github.com/paypal/paypal-messaging-components/issues/689) [#703](https://github.com/paypal/paypal-messaging-components/issues/703) [#720](https://github.com/paypal/paypal-messaging-components/issues/720) [#721](https://github.com/paypal/paypal-messaging-components/issues/721) [#750](https://github.com/paypal/paypal-messaging-components/issues/750) [#723](https://github.com/paypal/paypal-messaging-components/issues/723)


### Continuous Integration

* use path instead of filePath ([#760](https://github.com/paypal/paypal-messaging-components/issues/760)) ([050f181](https://github.com/paypal/paypal-messaging-components/commit/050f18160fab285bc5cd5edcd1efc06e40d21ddd))

### [1.30.1](https://github.com/paypal/paypal-messaging-components/compare/v1.30.0...v1.30.1) (2022-02-25)


### Bug Fixes

* accessibility issues including reverse tabbing and nav link focus ([#701](https://github.com/paypal/paypal-messaging-components/issues/701)) ([67a2aee](https://github.com/paypal/paypal-messaging-components/commit/67a2aee5a7eca9b851fdb676002c6c8fb1ccf037))
* add missing NI offerType map values ([#748](https://github.com/paypal/paypal-messaging-components/issues/748)) ([d2ae4b1](https://github.com/paypal/paypal-messaging-components/commit/d2ae4b1e8f6b0c293119f7f9b872a16aff44a46d))
* added buyerCountry to the list of props to memoize the modal ([#729](https://github.com/paypal/paypal-messaging-components/issues/729)) ([2e7e1d7](https://github.com/paypal/paypal-messaging-components/commit/2e7e1d77ee5827174e17a5e29b4d752ac33cd18b))
* calculate de-pi30 product list modal ([#735](https://github.com/paypal/paypal-messaging-components/issues/735)) ([2d25422](https://github.com/paypal/paypal-messaging-components/commit/2d25422fdcb893a1f2bb63289f8e49e1302a379e))
* donut font sizing and spacing ([#745](https://github.com/paypal/paypal-messaging-components/issues/745)) ([9e3e36a](https://github.com/paypal/paypal-messaging-components/commit/9e3e36ac2a33041cadf71157e0cf2587d232ced2))
* ensure callback functions work ([#739](https://github.com/paypal/paypal-messaging-components/issues/739)) ([062c3c3](https://github.com/paypal/paypal-messaging-components/commit/062c3c303488c56dd08a13d507840cc82e4d3f60))
* product list link render condition ([#746](https://github.com/paypal/paypal-messaging-components/issues/746)) ([cebd61a](https://github.com/paypal/paypal-messaging-components/commit/cebd61aa5dab0b2f2ca345deacd7cd1776c81c25))
* properly generate mrid for message update ([#741](https://github.com/paypal/paypal-messaging-components/issues/741)) ([366d6ec](https://github.com/paypal/paypal-messaging-components/commit/366d6ecfe2f20c856ee3f8d03d04f816af1a49b0))
* remove touchmove events to prevent scroll miscalculations ([#744](https://github.com/paypal/paypal-messaging-components/issues/744)) ([f962b82](https://github.com/paypal/paypal-messaging-components/commit/f962b8217adbefeaa9ded78ad209596eb4b7985e))
* updated replace for logo none and inline ([#747](https://github.com/paypal/paypal-messaging-components/issues/747)) ([5ca6f55](https://github.com/paypal/paypal-messaging-components/commit/5ca6f55484aba2c55e61ff709a0cc4649d737513))


### Code Refactoring

* update performance entry search (DTCRCGEMI-194) ([#717](https://github.com/paypal/paypal-messaging-components/issues/717)) ([cdee51d](https://github.com/paypal/paypal-messaging-components/commit/cdee51d52c854fc80dc6634fef5e89698f660b2a))

## [1.30.0](https://github.com/paypal/paypal-messaging-components/compare/v1.29.0...v1.30.0) (2022-02-14)


### Features

* universal modal ([#726](https://github.com/paypal/paypal-messaging-components/issues/726)) ([7e993ed](https://github.com/paypal/paypal-messaging-components/commit/7e993ed5aa94994390277a7cc431a69f24da6ea4))


### Continuous Integration

* fix auto stage tag ([#719](https://github.com/paypal/paypal-messaging-components/issues/719)) ([676055e](https://github.com/paypal/paypal-messaging-components/commit/676055e3e94edb1cbbb45cd108adcbe4836bbaf6))

## [1.29.0](https://github.com/paypal/paypal-messaging-components/compare/v1.28.0...v1.29.0) (2022-01-26)


### Features

* measure cdn stats (DTCRCGEMI-194) ([#687](https://github.com/paypal/paypal-messaging-components/issues/687)) ([5b21ce2](https://github.com/paypal/paypal-messaging-components/commit/5b21ce2a0bd7cfbf8cf46ca98ce44f50f6d52676))


### Bug Fixes

* locale parity  ([7d063d6](https://github.com/paypal/paypal-messaging-components/commit/7d063d6b56b7a33c09a913931e7d8519c53927d9)), closes [#708](https://github.com/paypal/paypal-messaging-components/issues/708)
* side-effect prop functions called once ([#715](https://github.com/paypal/paypal-messaging-components/issues/715)) ([ca62e2f](https://github.com/paypal/paypal-messaging-components/commit/ca62e2f8d25b84ae7c5b2efbdd135f79f0d8d923))
* wrap new globals access in try catch ([#716](https://github.com/paypal/paypal-messaging-components/issues/716)) ([b84153d](https://github.com/paypal/paypal-messaging-components/commit/b84153d230f4c3c21a5a4fa5e0cd625367650d3c))


### Continuous Integration

* add Spain and Italy to matrix for github actions ([#705](https://github.com/paypal/paypal-messaging-components/issues/705)) ([a1181db](https://github.com/paypal/paypal-messaging-components/commit/a1181db006e3b6d17e0a8c80a34c6d896385606e))
* fix snapshot update command ([#702](https://github.com/paypal/paypal-messaging-components/issues/702)) ([52280c9](https://github.com/paypal/paypal-messaging-components/commit/52280c9fc08fe3058fa362bb69fa640a035a951a))
* full transition to GitHub Actions ([#666](https://github.com/paypal/paypal-messaging-components/issues/666)) ([4589320](https://github.com/paypal/paypal-messaging-components/commit/4589320cd954aac7a07e8c4c84be81b19f64df11))
* simplify test paths ([#706](https://github.com/paypal/paypal-messaging-components/issues/706)) ([36fae63](https://github.com/paypal/paypal-messaging-components/commit/36fae63c949152ad99d2bfd23824ccb4ee716540))


### Code Refactoring

* add support for new __MESSAGING_GLOBALS__ object ([#696](https://github.com/paypal/paypal-messaging-components/issues/696)) ([4d9a5c0](https://github.com/paypal/paypal-messaging-components/commit/4d9a5c001ba44c2f399f71c68affcd1f0487d89c))
* remove renderMessage (re-adding from dtcgemi-32) ([#682](https://github.com/paypal/paypal-messaging-components/issues/682)) ([e4f2040](https://github.com/paypal/paypal-messaging-components/commit/e4f2040aec5269ba67efacefb22c65249da9dede))
* update legal disclosures for Pay in 4 and NI local modal content ([#700](https://github.com/paypal/paypal-messaging-components/issues/700)) ([bdf8d7c](https://github.com/paypal/paypal-messaging-components/commit/bdf8d7c6053a9d8f6d9553a124282f1df698ad76))

## [1.28.0](https://github.com/paypal/paypal-messaging-components/compare/v1.27.2...v1.28.0) (2022-01-11)


### Features

* DE Pi30 [snapshots] ([#602](https://github.com/paypal/paypal-messaging-components/issues/602)) ([d83ffa8](https://github.com/paypal/paypal-messaging-components/commit/d83ffa80a275484cc0af9b4407b58dc2e4376099))


### Build System

* remove static namespace from SDK meta file ([#676](https://github.com/paypal/paypal-messaging-components/issues/676)) ([4acee0b](https://github.com/paypal/paypal-messaging-components/commit/4acee0b0f442c104e25c68f2629881ba9858e89f))

### [1.27.2](https://github.com/paypal/paypal-messaging-components/compare/v1.27.1...v1.27.2) (2022-01-04)


### Bug Fixes

* accessibility issues ([#671](https://github.com/paypal/paypal-messaging-components/issues/671)) ([2f63ec5](https://github.com/paypal/paypal-messaging-components/commit/2f63ec52e2ddd3a550de674b9c81dfad714ce53f))
* gpl styles mobile view change ([#668](https://github.com/paypal/paypal-messaging-components/issues/668)) ([2736fab](https://github.com/paypal/paypal-messaging-components/commit/2736fab6bfac392af8ae104e517e238b3be1b50b))


### Code Refactoring

* add "no late fees" to US Pay in 4 modal ([#669](https://github.com/paypal/paypal-messaging-components/issues/669)) ([6df8202](https://github.com/paypal/paypal-messaging-components/commit/6df820252b9211b4fd11591c143c1189dca07230))
* add interest-free back into Pi3 cleanup ([#617](https://github.com/paypal/paypal-messaging-components/issues/617)) ([ff6a841](https://github.com/paypal/paypal-messaging-components/commit/ff6a841c09015c66a3f44ee587a16d3c6b8ba965))
* remove mention of late fees from US and UK modal content [snapshots] ([#592](https://github.com/paypal/paypal-messaging-components/issues/592)) ([576d363](https://github.com/paypal/paypal-messaging-components/commit/576d3632eb5725c5b7035ea810fb51a21ee8bf86))
* update DE legal disclosure for 9.99% ([944a0b4](https://github.com/paypal/paypal-messaging-components/commit/944a0b4d9aafe3112887da1b4e9382da7b82ceea))

### [1.27.1](https://github.com/paypal/paypal-messaging-components/compare/v1.27.0...v1.27.1) (2021-10-26)


### Code Refactoring

* client-side generated unique identifier provided as messageRequestId ([#570](https://github.com/paypal/paypal-messaging-components/issues/570)) ([650358a](https://github.com/paypal/paypal-messaging-components/commit/650358a36e1d8bf9f16076f6bb717a1e88b99654))

## [1.27.0](https://github.com/paypal/paypal-messaging-components/compare/v1.26.6...v1.27.0) (2021-10-20)


### Features

* add merchant configuration hash for caching ([#564](https://github.com/paypal/paypal-messaging-components/issues/564)) ([8c648c9](https://github.com/paypal/paypal-messaging-components/commit/8c648c911f7048c807274199b73f66c6df72fa43))


### Bug Fixes

* remove duplicate text from GPL GB flex messages [snapshots] ([#653](https://github.com/paypal/paypal-messaging-components/issues/653)) ([3396807](https://github.com/paypal/paypal-messaging-components/commit/339680709973a0b0f6a81a05e6de21f86fcc2ea7))
* remove Festivo font from modal ([#613](https://github.com/paypal/paypal-messaging-components/issues/613)) ([842c736](https://github.com/paypal/paypal-messaging-components/commit/842c736c4a9a998a66e07d8cb6a026be02a82d03))
* store child frame device ID in separate key [snapshots] ([#618](https://github.com/paypal/paypal-messaging-components/issues/618)) ([35ac487](https://github.com/paypal/paypal-messaging-components/commit/35ac4870cdac1b916a02b8c204cf77dcc156bc11))


### Code Refactoring

* update DE disclosure ([#619](https://github.com/paypal/paypal-messaging-components/issues/619)) ([74299d7](https://github.com/paypal/paypal-messaging-components/commit/74299d772d80580f11db1cd620a68f84d81b7948))


### Continuous Integration

* automatic stage tag ([#644](https://github.com/paypal/paypal-messaging-components/issues/644)) ([bb5b7c2](https://github.com/paypal/paypal-messaging-components/commit/bb5b7c209319d0ce3c2e43823e83e0bc027fc516))

### [1.26.6](https://github.com/paypal/paypal-messaging-components/compare/v1.26.5...v1.26.6) (2021-10-13)


### Bug Fixes

* use unformated APR for DE GPL disclosure check [snapshots] ([#634](https://github.com/paypal/paypal-messaging-components/issues/634)) ([dc72fbe](https://github.com/paypal/paypal-messaging-components/commit/dc72fbe9525036ac53ec115054d6c1e742265748))


### Code Refactoring

* fix accessibility issues from test reports ([#593](https://github.com/paypal/paypal-messaging-components/issues/593)) ([7ad90bd](https://github.com/paypal/paypal-messaging-components/commit/7ad90bd789827fef7b81f937e0533571c7245bdc))

### [1.26.5](https://github.com/paypal/paypal-messaging-components/compare/v1.26.4...v1.26.5) (2021-09-28)


### Code Refactoring

* add interest-free back into Pi3 [snapshots] ([c118983](https://github.com/paypal/paypal-messaging-components/commit/c118983ce28b0c2892f07637009b6609750ec1d1))

### [1.26.2](https://github.com/paypal/paypal-messaging-components/compare/v1.26.1...v1.26.2) (2021-08-25)


### Bug Fixes

* DE GPL flex banner styles [snapshots] ([#594](https://github.com/paypal/paypal-messaging-components/issues/594)) ([d5e613f](https://github.com/paypal/paypal-messaging-components/commit/d5e613f93cfc199cb619fd2a7e3b5a75fab77ae3))
* remove currency and buyerCountry strictness ([#598](https://github.com/paypal/paypal-messaging-components/issues/598)) ([53232c8](https://github.com/paypal/paypal-messaging-components/commit/53232c8fc14c8c6ca8b4e8c26e082f75317864b4))


### Code Refactoring

* add ignoreCache option to modal ([#583](https://github.com/paypal/paypal-messaging-components/issues/583)) ([4b06335](https://github.com/paypal/paypal-messaging-components/commit/4b06335d131aa28a1f7b983f1fa46dde6496d40b))
* omit pp_debug when missing ([#591](https://github.com/paypal/paypal-messaging-components/issues/591)) ([1be88b1](https://github.com/paypal/paypal-messaging-components/commit/1be88b1e85bba2e16c28d5305f11fc002d92389c))


### Continuous Integration

* improve generated release notes ([#586](https://github.com/paypal/paypal-messaging-components/issues/586)) ([93190ea](https://github.com/paypal/paypal-messaging-components/commit/93190eab11dd147a913e408cb25f405e7e926604))

## [1.26.1](https://github.com/paypal/paypal-messaging-components/compare/v1.26.0...v1.26.1) (2021-08-12)


### Bug Fixes

* DE GPL style bugs [snapshots] ([#577](https://github.com/paypal/paypal-messaging-components/issues/577)) ([62aa182](https://github.com/paypal/paypal-messaging-components/commit/62aa1820a4432f581722d370ce8ec38914aabf2a))

# [1.26.0](https://github.com/paypal/paypal-messaging-components/compare/v1.25.2...v1.26.0) (2021-08-04)


### Bug Fixes

* ie11 loading issue ([#554](https://github.com/paypal/paypal-messaging-components/issues/554)) ([b971c20](https://github.com/paypal/paypal-messaging-components/commit/b971c20521d0c4026578a02673d5e909944fec4d))
* remove collapsed elements from overflow calculation ([#573](https://github.com/paypal/paypal-messaging-components/issues/573)) ([ef20588](https://github.com/paypal/paypal-messaging-components/commit/ef20588b2a0073c091327802e9f9e60a020e46bb))


### Features

* default PayPal fonts to off [snapshots] ([#540](https://github.com/paypal/paypal-messaging-components/issues/540)) ([3b8c13c](https://github.com/paypal/paypal-messaging-components/commit/3b8c13c163992030d7512cada46f85d3d3215acf))

## [1.25.2](https://github.com/paypal/paypal-messaging-components/compare/v1.25.1...v1.25.2) (2021-07-16)


### Bug Fixes

* fix amount comparison ([#562](https://github.com/paypal/paypal-messaging-components/issues/562)) ([72bfb66](https://github.com/paypal/paypal-messaging-components/commit/72bfb6615df62c04b49bfee9cf591ed5aeee0bbb))
* use new server data to update calculator directly ([#560](https://github.com/paypal/paypal-messaging-components/issues/560)) ([0dcb7ff](https://github.com/paypal/paypal-messaging-components/commit/0dcb7ff3260eb238fb9a0554b3f9a1728430aaa3))

## [1.25.1](https://github.com/paypal/paypal-messaging-components/compare/v1.25.0...v1.25.1) (2021-07-14)


### Bug Fixes

* de gpl modal calc ([#558](https://github.com/paypal/paypal-messaging-components/issues/558)) ([92912f4](https://github.com/paypal/paypal-messaging-components/commit/92912f40b9d251a81800e445ab3874e9f123c362))

# [1.25.0](https://github.com/paypal/paypal-messaging-components/compare/v1.24.1...v1.25.0) (2021-07-09)


### Bug Fixes

* split up non-US travis snapshot job ([1175942](https://github.com/paypal/paypal-messaging-components/commit/1175942277a10950a764c6869a51028fa37c0c8f))


### Features

* DE GPL [snapshots] ([#493](https://github.com/paypal/paypal-messaging-components/issues/493)) ([5d9a5a6](https://github.com/paypal/paypal-messaging-components/commit/5d9a5a6fdfa270dc3fb1f38f3b96c8c0dbeaf82d))

## [1.24.1](https://github.com/paypal/paypal-messaging-components/compare/v1.24.0...v1.24.1) (2021-06-22)


### Bug Fixes

* determine SDK host from script src ([#542](https://github.com/paypal/paypal-messaging-components/issues/542)) ([658ecca](https://github.com/paypal/paypal-messaging-components/commit/658eccacb1dd6bf36dbbb462cad37d6fec32f998))

# [1.24.0](https://github.com/paypal/paypal-messaging-components/compare/v1.23.2...v1.24.0) (2021-06-09)


### Bug Fixes

* ensure SDK script is not being destroyed before rerendering a destroyed message ([#535](https://github.com/paypal/paypal-messaging-components/issues/535)) ([8d308e9](https://github.com/paypal/paypal-messaging-components/commit/8d308e98258f67bb205798e205fe65c983d5a8ca))


### Features

* debug mode ([#521](https://github.com/paypal/paypal-messaging-components/issues/521)) ([7c589e1](https://github.com/paypal/paypal-messaging-components/commit/7c589e1dfb2f78923219926190d9e60642540a4a))

## [1.23.2](https://github.com/paypal/paypal-messaging-components/compare/v1.23.1...v1.23.2) (2021-05-25)


### Bug Fixes

* include refIndex meta in logger payload ([#530](https://github.com/paypal/paypal-messaging-components/issues/530)) ([52b1126](https://github.com/paypal/paypal-messaging-components/commit/52b112667c1c0239c8be44d89d757eb79c3569bb))

## [1.23.1](https://github.com/paypal/paypal-messaging-components/compare/v1.23.0...v1.23.1) (2021-05-24)

# [1.23.0](https://github.com/paypal/paypal-messaging-components/compare/v1.22.1...v1.23.0) (2021-05-18)


### Bug Fixes

* improve automatic message rendering ([#508](https://github.com/paypal/paypal-messaging-components/issues/508)) ([7b807cd](https://github.com/paypal/paypal-messaging-components/commit/7b807cd319db1c7a02c60af66079a625a97a4b8f))


### Features

* add text align to FR ([#481](https://github.com/paypal/paypal-messaging-components/issues/481)) ([160624b](https://github.com/paypal/paypal-messaging-components/commit/160624b4820880157620c37710eefe4fc44d3f08))
* add text align to GB [snapshots] ([#480](https://github.com/paypal/paypal-messaging-components/issues/480)) ([ae104c8](https://github.com/paypal/paypal-messaging-components/commit/ae104c8832f152835f57c6edc067f149f04fb025))
* allow messages to render while offscreen ([#501](https://github.com/paypal/paypal-messaging-components/issues/501)) ([f62d78d](https://github.com/paypal/paypal-messaging-components/commit/f62d78d96f2b7a79b25fb57fa87089c6a49beafa))

## [1.22.1](https://github.com/paypal/paypal-messaging-components/compare/v1.22.0...v1.22.1) (2021-05-06)


### Bug Fixes

* handle empty account zoid props ([#514](https://github.com/paypal/paypal-messaging-components/issues/514)) ([d6222e9](https://github.com/paypal/paypal-messaging-components/commit/d6222e9bf943dd9d59f4216686463b0403602029))

# [1.22.0](https://github.com/paypal/paypal-messaging-components/compare/v1.21.3...v1.22.0) (2021-05-04)


### Bug Fixes

* account for ongoing SDK destroy in MutationObservers ([#509](https://github.com/paypal/paypal-messaging-components/issues/509)) ([e16f730](https://github.com/paypal/paypal-messaging-components/commit/e16f7305804fe79ca212e6df92915b5df40cde90))


### Features

* GPL Australia [snapshots] ([#492](https://github.com/paypal/paypal-messaging-components/issues/492)) ([3354c90](https://github.com/paypal/paypal-messaging-components/commit/3354c90055e9be354186f66f688481855b0959de))

## [1.21.3](https://github.com/paypal/paypal-messaging-components/compare/v1.21.2...v1.21.3) (2021-04-21)


### Bug Fixes

* properly bootstrap zoid inside iframe ([#496](https://github.com/paypal/paypal-messaging-components/issues/496)) ([84aa81c](https://github.com/paypal/paypal-messaging-components/commit/84aa81c90ed720a30ebcd7a0e47966788c6e54e6))

## [1.21.2](https://github.com/paypal/paypal-messaging-components/compare/v1.21.1...v1.21.2) (2021-04-07)

## [1.21.1](https://github.com/paypal/paypal-messaging-components/compare/v1.21.0...v1.21.1) (2021-04-06)


### Bug Fixes

* allow EZP messages to fit in smaller spaces ([#469](https://github.com/paypal/paypal-messaging-components/issues/469)) ([a6f3077](https://github.com/paypal/paypal-messaging-components/commit/a6f3077a8019ea894350811bffc8baf5559161d3))
* improve overflow detection for pages with smaller heights ([#485](https://github.com/paypal/paypal-messaging-components/issues/485)) ([623a309](https://github.com/paypal/paypal-messaging-components/commit/623a3094ec6da58f1904eee2c636177abb91fcb3))
* lazy load globals to account for SDK lifecycle ([#483](https://github.com/paypal/paypal-messaging-components/issues/483)) ([a56e6b0](https://github.com/paypal/paypal-messaging-components/commit/a56e6b079e96dcecd237ee7378345061d2975ba8))

# [1.21.0](https://github.com/paypal/paypal-messaging-components/compare/v1.20.1...v1.21.0) (2021-03-31)


### Bug Fixes

* add ponyfills for IE11 support ([#475](https://github.com/paypal/paypal-messaging-components/issues/475)) ([b212ca5](https://github.com/paypal/paypal-messaging-components/commit/b212ca52f95002945ab18403255f49258b0f941b))
* send script UID to server ([#476](https://github.com/paypal/paypal-messaging-components/issues/476)) ([b20027c](https://github.com/paypal/paypal-messaging-components/commit/b20027c10ffa36451db394ce0a197da67bc56fc3))
* update imgur script ([#474](https://github.com/paypal/paypal-messaging-components/issues/474)) ([44bb0c2](https://github.com/paypal/paypal-messaging-components/commit/44bb0c2253ef1dc842777dbe1375b24ac16a9430))


### Features

* unique iframe titles ([#461](https://github.com/paypal/paypal-messaging-components/issues/461)) ([ce70609](https://github.com/paypal/paypal-messaging-components/commit/ce70609cbd790499d4694ab51b043a8548488554))

# [1.20.0](https://github.com/paypal/paypal-messaging-components/compare/v1.19.0...v1.20.0) (2021-03-10)


### Bug Fixes

* add offer class and GB custom for custom messages ([#452](https://github.com/paypal/paypal-messaging-components/issues/452)) ([60fc2c0](https://github.com/paypal/paypal-messaging-components/commit/60fc2c0a1322931037e3b3cdf04145fe347816e6))
* remove incorrect modal tab click events ([#453](https://github.com/paypal/paypal-messaging-components/issues/453)) ([d58058b](https://github.com/paypal/paypal-messaging-components/commit/d58058b60fa92ccd5344c5e3956f927a2257d2c0))


### Features

* standalone modal support ([#402](https://github.com/paypal/paypal-messaging-components/issues/402)) ([17c7715](https://github.com/paypal/paypal-messaging-components/commit/17c7715db56c981686c86a1b0fcccfa244f7bea8))

# [1.19.0](https://github.com/paypal/paypal-messaging-components/compare/v1.18.0...v1.19.0) (2021-02-24)


### Bug Fixes

* passback warnings ([#423](https://github.com/paypal/paypal-messaging-components/issues/423)) ([e1751e8](https://github.com/paypal/paypal-messaging-components/commit/e1751e8b7ab7d3435379a5c31330dbd13c9ed234))
* use € instead of EUR in qualifying French modal ([#441](https://github.com/paypal/paypal-messaging-components/issues/441)) ([c95de98](https://github.com/paypal/paypal-messaging-components/commit/c95de98ec24b546c2f7b3a92ebad5b1ea5552d2d))


### Features

* set text as explicit default ([#410](https://github.com/paypal/paypal-messaging-components/issues/410)) ([65fbfa7](https://github.com/paypal/paypal-messaging-components/commit/65fbfa74b3e5416a944670e72a233860d700d710))

# [1.18.0](https://github.com/paypal/paypal-messaging-components/compare/v1.17.1...v1.18.0) (2021-02-17)


### Bug Fixes

* add missing modal content variables ([#437](https://github.com/paypal/paypal-messaging-components/issues/437)) ([ffa9fdc](https://github.com/paypal/paypal-messaging-components/commit/ffa9fdc9f312abb1a4fb1ee6f210bb881e3abb14))
* primary PPC logo alignment and wrapping for position right ([#440](https://github.com/paypal/paypal-messaging-components/issues/440)) ([6d01263](https://github.com/paypal/paypal-messaging-components/commit/6d0126383bb32f1672fb29c0ee4dfd93be5b2684))
* show the correct non-pill multi-product headline ([#425](https://github.com/paypal/paypal-messaging-components/issues/425)) ([b2d9e8a](https://github.com/paypal/paypal-messaging-components/commit/b2d9e8a492f7099eb4748916b96a96aa595b99c2))
* sticky behavior on mobile modal after tab switching ([#435](https://github.com/paypal/paypal-messaging-components/issues/435)) ([6a4b43a](https://github.com/paypal/paypal-messaging-components/commit/6a4b43addddd108e1b0e968024147361640b5d00))


### Features

* add GPLNQ purchase range message ([#434](https://github.com/paypal/paypal-messaging-components/issues/434)) ([46058b5](https://github.com/paypal/paypal-messaging-components/commit/46058b59d5b756833d84202d7062118e8476be52))
* add text align parameter to US text messages ([#421](https://github.com/paypal/paypal-messaging-components/issues/421)) ([1dc43d7](https://github.com/paypal/paypal-messaging-components/commit/1dc43d7293f4a50ce00e889baa8b66da6f1a372d))
* detect dynamic message element insertion ([#419](https://github.com/paypal/paypal-messaging-components/issues/419)) ([20aafe9](https://github.com/paypal/paypal-messaging-components/commit/20aafe9d6aaf1984287da7f86ca50e4237291a96))
* handle inline HTML event handlers ([#414](https://github.com/paypal/paypal-messaging-components/issues/414)) ([e143029](https://github.com/paypal/paypal-messaging-components/commit/e1430290bb59d2857a5f93b8237ed5a008be0aba))

## [1.17.1](https://github.com/paypal/paypal-messaging-components/compare/v1.17.0...v1.17.1) (2021-01-27)


### Bug Fixes

* add locales.js file to package.json ([#432](https://github.com/paypal/paypal-messaging-components/issues/432)) ([3922f22](https://github.com/paypal/paypal-messaging-components/commit/3922f2260826e1b5e75d7ddf32d423c2f6f5b0dd))

# [1.17.0](https://github.com/paypal/paypal-messaging-components/compare/v1.16.0...v1.17.0) (2021-01-27)


### Bug Fixes

* swap server render parameter order ([#422](https://github.com/paypal/paypal-messaging-components/issues/422)) ([8b709aa](https://github.com/paypal/paypal-messaging-components/commit/8b709aa9e46836ef8d4df033eb7d29acd831cdf3))


### Features

* GPL France ([#405](https://github.com/paypal/paypal-messaging-components/issues/405)) ([b759bd5](https://github.com/paypal/paypal-messaging-components/commit/b759bd57aebdd4ca73e7d25481a112d0485f4d12))
* support fontFamily and fontSrc ([#398](https://github.com/paypal/paypal-messaging-components/issues/398)) ([84e6339](https://github.com/paypal/paypal-messaging-components/commit/84e6339604ab4b4b24fb5b021fb37d16362fa583))


### Reverts

* downgrade Travis CI to node 10 ([#430](https://github.com/paypal/paypal-messaging-components/issues/430)) ([c67f648](https://github.com/paypal/paypal-messaging-components/commit/c67f6487d37ab834da98ffffb4fe1a72ef6fae6a))

# [1.16.0](https://github.com/paypal/paypal-messaging-components/compare/v1.15.4...v1.16.0) (2021-01-13)


### Bug Fixes

* message content size detection ([#415](https://github.com/paypal/paypal-messaging-components/issues/415)) ([ce71fb0](https://github.com/paypal/paypal-messaging-components/commit/ce71fb0b88d5a6df8ce989920c55c84c519a6a33))


### Features

* Add EZP fallback messages ([#392](https://github.com/paypal/paypal-messaging-components/issues/392)) ([a1f8bfb](https://github.com/paypal/paypal-messaging-components/commit/a1f8bfb81f821c42c077d3fd3c5950a97eb0923f))

## [1.15.4](https://github.com/paypal/paypal-messaging-components/compare/v1.15.3...v1.15.4) (2021-01-08)


### Bug Fixes

* maintain modal logging payload ([#411](https://github.com/paypal/paypal-messaging-components/issues/411)) ([b35a7a3](https://github.com/paypal/paypal-messaging-components/commit/b35a7a314dc70d1b444b23c139c790b30b9024b0))

## [1.15.3](https://github.com/paypal/paypal-messaging-components/compare/v1.15.2...v1.15.3) (2021-01-06)


### Bug Fixes

* buyer country content effect hook dependency ([#391](https://github.com/paypal/paypal-messaging-components/issues/391)) ([0bc31cf](https://github.com/paypal/paypal-messaging-components/commit/0bc31cf5b46a469ff3642b7af4cf97e47abe5712))
* GB modal overlay size ([#389](https://github.com/paypal/paypal-messaging-components/issues/389)) ([d091d39](https://github.com/paypal/paypal-messaging-components/commit/d091d39748ebe54f629c7b3ec5222f6cbb837edd))
* include buyer country with message rerender ([#390](https://github.com/paypal/paypal-messaging-components/issues/390)) ([f9939d8](https://github.com/paypal/paypal-messaging-components/commit/f9939d893ce03a9194cfa8fbfe295ef38838e8aa))
* swap US GPL qualifying modal bullet logic ([#383](https://github.com/paypal/paypal-messaging-components/issues/383)) ([86003ed](https://github.com/paypal/paypal-messaging-components/commit/86003ed3915df309066d6144556e0d523759a867))
* track tab-alternative click ([#388](https://github.com/paypal/paypal-messaging-components/issues/388)) ([4b3d09b](https://github.com/paypal/paypal-messaging-components/commit/4b3d09b3d58c2829dd98622b0bc0859be8d0972f))

## [1.15.1](https://github.com/paypal/paypal-messaging-components/compare/v1.15.0...v1.15.1) (2020-10-28)


### Bug Fixes

* enable GPL custom messages ([#370](https://github.com/paypal/paypal-messaging-components/issues/370)) ([939ba54](https://github.com/paypal/paypal-messaging-components/commit/939ba54f02eab18fb3dd0eefa7800a5947a495ef))
* return NONE tag when visible element is not found ([#371](https://github.com/paypal/paypal-messaging-components/issues/371)) ([9301be6](https://github.com/paypal/paypal-messaging-components/commit/9301be668ee8fce4f6bc3c08080bd1129968900d))
* various bug fixes for demo app support ([#367](https://github.com/paypal/paypal-messaging-components/issues/367)) ([df94ad7](https://github.com/paypal/paypal-messaging-components/commit/df94ad7dc052f6302795b918a9a8c32b963ac3f4))

# [1.15.0](https://github.com/paypal/paypal-messaging-components/compare/v1.14.2...v1.15.0) (2020-10-21)


### Bug Fixes

* expand content height for IE11 ([#359](https://github.com/paypal/paypal-messaging-components/issues/359)) ([c853eaf](https://github.com/paypal/paypal-messaging-components/commit/c853eafaa5f563f463fc9b946583f981a42d11de))
* GB mobile modal header ([#358](https://github.com/paypal/paypal-messaging-components/issues/358)) ([a298ea6](https://github.com/paypal/paypal-messaging-components/commit/a298ea65bde3494512ada1308588f1d9e624d6ba))
* GPL no amount flex styles ([#365](https://github.com/paypal/paypal-messaging-components/issues/365)) ([df9f943](https://github.com/paypal/paypal-messaging-components/commit/df9f943047557d69c7e365ee556d9e1318524fb1))
* GPL wrapping mutations ([#364](https://github.com/paypal/paypal-messaging-components/issues/364)) ([3cbed11](https://github.com/paypal/paypal-messaging-components/commit/3cbed1159609c27e302a96e1af60adf6f65fbe46))
* update GB qualifying attribute check ([#353](https://github.com/paypal/paypal-messaging-components/issues/353)) ([fface76](https://github.com/paypal/paypal-messaging-components/commit/fface763ecec3374f5cd82967be73ecf673e4c8c))
* update modal content ([#362](https://github.com/paypal/paypal-messaging-components/issues/362)) ([544ac58](https://github.com/paypal/paypal-messaging-components/commit/544ac581fb455a8ea87921dbe161b1f081564d3f))


### Features

* update GPL message logic ([#363](https://github.com/paypal/paypal-messaging-components/issues/363)) ([8511a4f](https://github.com/paypal/paypal-messaging-components/commit/8511a4f38438fc0408caba40bd85c4b1b3863443))

## [1.14.2](https://github.com/paypal/paypal-messaging-components/compare/v1.14.1...v1.14.2) (2020-10-15)


### Bug Fixes

* account for mobile URL search bar in overflow calculation ([#356](https://github.com/paypal/paypal-messaging-components/issues/356)) ([f2098c5](https://github.com/paypal/paypal-messaging-components/commit/f2098c588246c77059b55fb9e049c8fd62129d60))
* hide sticky apply now on modal close or tab switch ([#354](https://github.com/paypal/paypal-messaging-components/issues/354)) ([b2f12e8](https://github.com/paypal/paypal-messaging-components/commit/b2f12e811d08d800f7f644a6cad5cafcccba2a25))
* modal scroll ([#355](https://github.com/paypal/paypal-messaging-components/issues/355)) ([53ac3c1](https://github.com/paypal/paypal-messaging-components/commit/53ac3c1f72a26134c618ec3377c1806e4d70ae05))

## [1.14.1](https://github.com/paypal/paypal-messaging-components/compare/v1.14.0...v1.14.1) (2020-10-14)


### Bug Fixes

* force repaint to prevent Firefox locked scroll ([#344](https://github.com/paypal/paypal-messaging-components/issues/344)) ([70d996a](https://github.com/paypal/paypal-messaging-components/commit/70d996ad07dfde1c1b164e9b65c23e7493a46d10))
* GPL modal height ([#338](https://github.com/paypal/paypal-messaging-components/issues/338)) ([4f50c22](https://github.com/paypal/paypal-messaging-components/commit/4f50c22bb67bf9236b6ab28624e1257297fd3e2f))
* modal scroll on iOS ([#343](https://github.com/paypal/paypal-messaging-components/issues/343)) ([70ff0ae](https://github.com/paypal/paypal-messaging-components/commit/70ff0aec2c7c5cccd4c6ad90a730b30c48886252))
* modal scrollbar accessibility on Windows ([#346](https://github.com/paypal/paypal-messaging-components/issues/346)) ([2824597](https://github.com/paypal/paypal-messaging-components/commit/28245975adcc535b1ef7ace7573c143886b5152f))
* NI/GB modal content ([#348](https://github.com/paypal/paypal-messaging-components/issues/348)) ([49cc2f3](https://github.com/paypal/paypal-messaging-components/commit/49cc2f32325d234721868598c47246aa6fe81f49))
* over extended header in Firefox ([#345](https://github.com/paypal/paypal-messaging-components/issues/345)) ([4d5856e](https://github.com/paypal/paypal-messaging-components/commit/4d5856e9f9b0d3b752134ae5bd790cfb0c13b9c9))
* pass buyer country in modal data re-fetch ([#342](https://github.com/paypal/paypal-messaging-components/issues/342)) ([0d8e1af](https://github.com/paypal/paypal-messaging-components/commit/0d8e1af20e76acad709ad9a9cb90946409c3405e))
* select correct tab when modal offer changes ([#341](https://github.com/paypal/paypal-messaging-components/issues/341)) ([c2cc0e8](https://github.com/paypal/paypal-messaging-components/commit/c2cc0e8c618dcdbdb3e4f481af67cef082fea6c3))
* substitute modal terms variables dynamically ([#350](https://github.com/paypal/paypal-messaging-components/issues/350)) ([6c2b9ef](https://github.com/paypal/paypal-messaging-components/commit/6c2b9ef063c2be569e30fbd488465752542a9d55))

# [1.14.0](https://github.com/paypal/paypal-messaging-components/compare/v1.13.8...v1.14.0) (2020-10-07)


### Features

* GPL US messages ([#332](https://github.com/paypal/paypal-messaging-components/issues/332)) ([dff3ed6](https://github.com/paypal/paypal-messaging-components/commit/dff3ed694336b0ec3d78b30e7371c1b24b20a7a8))

## [1.13.8](https://github.com/paypal/paypal-messaging-components/compare/v1.13.7...v1.13.8) (2020-10-06)


### Bug Fixes

* prevent overflow observer race condition ([#329](https://github.com/paypal/paypal-messaging-components/issues/329)) ([b9e81d7](https://github.com/paypal/paypal-messaging-components/commit/b9e81d7759cb32c938c465e4f50ffbdf21ebf685))

## [1.13.7](https://github.com/paypal/paypal-messaging-components/compare/v1.13.6...v1.13.7) (2020-10-05)


### Bug Fixes

* compare numeric values with root height calculations ([#317](https://github.com/paypal/paypal-messaging-components/issues/317)) ([38daae6](https://github.com/paypal/paypal-messaging-components/commit/38daae684fc78e9f831962e2876d1a223c47d6cf))
* DE modal preact className issue ([#316](https://github.com/paypal/paypal-messaging-components/issues/316)) ([e7ea62e](https://github.com/paypal/paypal-messaging-components/commit/e7ea62e2c7ef3afe931ea84632ae963bb6ef5f63))
* handle GPL modal type ([#320](https://github.com/paypal/paypal-messaging-components/issues/320)) ([b1b4131](https://github.com/paypal/paypal-messaging-components/commit/b1b41312007061f8adef1cbdc8617cda4b002da2))
* handle undefined window reference when running locally ([#325](https://github.com/paypal/paypal-messaging-components/issues/325)) ([c53e4dc](https://github.com/paypal/paypal-messaging-components/commit/c53e4dc3ced6538dd6db2558004e0366e4b0b9a0))
* improve overflow detection with html and body height 100% ([#323](https://github.com/paypal/paypal-messaging-components/issues/323)) ([c857953](https://github.com/paypal/paypal-messaging-components/commit/c857953b7d3adfab701d6783302fa4e4f557c003))
* remove default preset value ([#318](https://github.com/paypal/paypal-messaging-components/issues/318)) ([8f18e0f](https://github.com/paypal/paypal-messaging-components/commit/8f18e0f2ec2722695ef06192ba36e57104a4bcc2))

## [1.13.6](https://github.com/paypal/paypal-messaging-components/compare/v1.13.5...v1.13.6) (2020-09-30)


### Bug Fixes

* append data to existing bdata ([#307](https://github.com/paypal/paypal-messaging-components/issues/307)) ([febf58d](https://github.com/paypal/paypal-messaging-components/commit/febf58d9c7c74bcef8c6dd9b5aca896bce9df2db))
* improve updating message styles ([#305](https://github.com/paypal/paypal-messaging-components/issues/305)) ([0ed2449](https://github.com/paypal/paypal-messaging-components/commit/0ed2449a0947a032cf561669d967e98ffd5b181a))
* polyfill in old modal code ([#301](https://github.com/paypal/paypal-messaging-components/issues/301)) ([e8b68b5](https://github.com/paypal/paypal-messaging-components/commit/e8b68b5b330d1ef6982d4dabfbee157530c940fc))
* store viewport state on DOM elements to prevent SDK destroy issues ([#314](https://github.com/paypal/paypal-messaging-components/issues/314)) ([bd9220f](https://github.com/paypal/paypal-messaging-components/commit/bd9220f4e15933511e7a48c396e571968032397e))

## [1.13.5](https://github.com/paypal/paypal-messaging-components/compare/v1.13.4...v1.13.5) (2020-09-23)


### Bug Fixes

* ensure DOM ready before searching for root page element ([#294](https://github.com/paypal/paypal-messaging-components/issues/294)) ([511d268](https://github.com/paypal/paypal-messaging-components/commit/511d2685eb8fd84525385c0e6ebabc7394f54b14))
* protect against server side document check ([#295](https://github.com/paypal/paypal-messaging-components/issues/295)) ([807d56e](https://github.com/paypal/paypal-messaging-components/commit/807d56e6ffb1595e07b11754d49795c8bff13d37))

## [1.13.4](https://github.com/paypal/paypal-messaging-components/compare/v1.13.3...v1.13.4) (2020-09-21)


### Bug Fixes

* zoid container overflow detection and modal iframe styles ([#290](https://github.com/paypal/paypal-messaging-components/issues/290)) ([4185290](https://github.com/paypal/paypal-messaging-components/commit/4185290ad5b58951979b776214e18f78dd399a5f))

## [1.13.3](https://github.com/paypal/paypal-messaging-components/compare/v1.13.2...v1.13.3) (2020-09-16)


### Bug Fixes

* inline text size ([#280](https://github.com/paypal/paypal-messaging-components/issues/280)) ([f8ea320](https://github.com/paypal/paypal-messaging-components/commit/f8ea320db03cfcd66b629a1a1df45a81aaa69429))
* prevent firing message onClick with modal onClick ([#282](https://github.com/paypal/paypal-messaging-components/issues/282)) ([d8df44b](https://github.com/paypal/paypal-messaging-components/commit/d8df44b9956030ff04a3db0afd0ed30bf9d2f1b1))
* update message render variant ([#279](https://github.com/paypal/paypal-messaging-components/issues/279)) ([11d2211](https://github.com/paypal/paypal-messaging-components/commit/11d2211b4cd55e27809e8711695d53874cc9e4e8))

## [1.13.2](https://github.com/paypal/paypal-messaging-components/compare/v1.13.1...v1.13.2) (2020-09-09)


### Bug Fixes

* allow for inline text size attribute ([#273](https://github.com/paypal/paypal-messaging-components/issues/273)) ([c511b50](https://github.com/paypal/paypal-messaging-components/commit/c511b50985cbd96645fef937c46902a31f75cbae))
* improve handling iframe moving around the DOM ([#274](https://github.com/paypal/paypal-messaging-components/issues/274)) ([93e9323](https://github.com/paypal/paypal-messaging-components/commit/93e93232ac37247c13f63f3fc9346a4187992d0e))
* prevent setup from overwritting alias if no account present ([#271](https://github.com/paypal/paypal-messaging-components/issues/271)) ([11c0527](https://github.com/paypal/paypal-messaging-components/commit/11c0527fdd1c17eb4afcbedcb8fc92500fee56bc))

## [1.13.1](https://github.com/paypal/paypal-messaging-components/compare/v1.13.0...v1.13.1) (2020-09-02)


### Bug Fixes

* production modal bundle name ([#269](https://github.com/paypal/paypal-messaging-components/issues/269)) ([97278d8](https://github.com/paypal/paypal-messaging-components/commit/97278d88bfe7c1f7c5b4fa7f9c3a31ab07510c71))

# [1.13.0](https://github.com/paypal/paypal-messaging-components/compare/v1.12.4...v1.13.0) (2020-09-02)


### Features

* zoid message ([#262](https://github.com/paypal/paypal-messaging-components/issues/262)) ([36f8321](https://github.com/paypal/paypal-messaging-components/commit/36f8321f15d846232cf2b8665b4b0e96a471f4d6))

## [1.12.4](https://github.com/paypal/paypal-messaging-components/compare/v1.12.3...v1.12.4) (2020-08-19)


### Bug Fixes

* handle modal prop changes correctly ([#251](https://github.com/paypal/paypal-messaging-components/issues/251)) ([2a5dd0f](https://github.com/paypal/paypal-messaging-components/commit/2a5dd0f711a6d89cd0f47655829910abd3ae8c06))

## [1.12.3](https://github.com/paypal/paypal-messaging-components/compare/v1.12.2...v1.12.3) (2020-08-12)


### Bug Fixes

* send flf5 post-fix to CAPE ([#247](https://github.com/paypal/paypal-messaging-components/issues/247)) ([d5692ef](https://github.com/paypal/paypal-messaging-components/commit/d5692efb1cf1eec39c40fa87c2f920868049f4bd))
* use production modal script in sandbox ([#248](https://github.com/paypal/paypal-messaging-components/issues/248)) ([6595790](https://github.com/paypal/paypal-messaging-components/commit/65957905bd818649563499e132fefa36bf9e7c87))

## [1.12.2](https://github.com/paypal/paypal-messaging-components/compare/v1.12.1...v1.12.2) (2020-08-05)


### Bug Fixes

* apply now link consistent with sdk environment ([#242](https://github.com/paypal/paypal-messaging-components/issues/242)) ([0bb93da](https://github.com/paypal/paypal-messaging-components/commit/0bb93da3e59f852fdc683d718913ae833e977fbb))
* correct validation for font sizes ([#235](https://github.com/paypal/paypal-messaging-components/issues/235)) ([db5f9be](https://github.com/paypal/paypal-messaging-components/commit/db5f9be3becf966edb670713c225a809fa921c16))
* correctly pass terms values to PayPal Flex modal ([#239](https://github.com/paypal/paypal-messaging-components/issues/239)) ([3d77fa4](https://github.com/paypal/paypal-messaging-components/commit/3d77fa4a50a7fe4d08d9c4c29b7e93ccbe866b44))
* modal slow scroll behavior on mobile ([#243](https://github.com/paypal/paypal-messaging-components/issues/243)) ([ce83fac](https://github.com/paypal/paypal-messaging-components/commit/ce83fac130ce18f5c7c37e165deea64b1a44f927))

## [1.12.1](https://github.com/paypal/paypal-messaging-components/compare/v1.12.0...v1.12.1) (2020-07-21)

# [1.12.0](https://github.com/paypal/paypal-messaging-components/compare/v1.11.0...v1.12.0) (2020-07-15)


### Bug Fixes

* cleanup message variables ([#227](https://github.com/paypal/paypal-messaging-components/issues/227)) ([aefed8d](https://github.com/paypal/paypal-messaging-components/commit/aefed8d0670b854ee8fe0a5a6d7913d201b1b7ad))


### Features

* PayPal Flex ([#230](https://github.com/paypal/paypal-messaging-components/issues/230)) ([4ba0b32](https://github.com/paypal/paypal-messaging-components/commit/4ba0b32546338af8c7f7864096c974a2ab1585ea))

# [1.11.0](https://github.com/paypal/paypal-messaging-components/compare/v1.10.4...v1.11.0) (2020-07-08)


### Features

* add black message variants for US PPC ([#220](https://github.com/paypal/paypal-messaging-components/issues/220)) ([2ab3a50](https://github.com/paypal/paypal-messaging-components/commit/2ab3a50c54ddad746e8add08ce8a9c6b0a1e82e6))

## [1.10.4](https://github.com/paypal/paypal-messaging-components/compare/v1.10.3...v1.10.4) (2020-06-30)

## [1.10.3](https://github.com/paypal/paypal-messaging-components/compare/v1.10.2...v1.10.3) (2020-06-18)


### Bug Fixes

* correctly pass csrf fetching terms ([#210](https://github.com/paypal/paypal-messaging-components/issues/210)) ([50980a0](https://github.com/paypal/paypal-messaging-components/commit/50980a03a615d9eae2d36d7ab5ade4c55a8d5c43))
* DE alternative logo alignment ([#214](https://github.com/paypal/paypal-messaging-components/issues/214)) ([a6b179b](https://github.com/paypal/paypal-messaging-components/commit/a6b179b6469f2e73cc2bf5a963ef032360d7a609))
* modal loading state appearance ([#213](https://github.com/paypal/paypal-messaging-components/issues/213)) ([2b7c325](https://github.com/paypal/paypal-messaging-components/commit/2b7c325281d0b79fd56377da1972409b4db7e873))

## [1.10.2](https://github.com/paypal/paypal-messaging-components/compare/v1.10.1...v1.10.2) (2020-06-17)


### Bug Fixes

* cleanup on SDK replace ([#203](https://github.com/paypal/paypal-messaging-components/issues/203)) ([a2890db](https://github.com/paypal/paypal-messaging-components/commit/a2890db6bd2d09d054421f4dd24880e9903ff0bc))
* DE hyperlink color, logo size, and remove period ([#205](https://github.com/paypal/paypal-messaging-components/issues/205)) ([5ebd7da](https://github.com/paypal/paypal-messaging-components/commit/5ebd7da819241785a89a4ca3cd79725b34c9fbff))
* remove modal double scrollbar ([#207](https://github.com/paypal/paypal-messaging-components/issues/207)) ([44388c6](https://github.com/paypal/paypal-messaging-components/commit/44388c612b3bf3796690f2a4198f746e3242312f))

## [1.10.1](https://github.com/paypal/paypal-messaging-components/compare/v1.10.0...v1.10.1) (2020-05-13)


### Bug Fixes

* update ramp URL to respond with correct headers ([#201](https://github.com/paypal/paypal-messaging-components/issues/201)) ([5fdc79c](https://github.com/paypal/paypal-messaging-components/commit/5fdc79c772eceeb157d6008dee59c19b13e7138a))

# [1.10.0](https://github.com/paypal/paypal-messaging-components/compare/v1.9.0...v1.10.0) (2020-05-13)


### Bug Fixes

* modal memoization ([#199](https://github.com/paypal/paypal-messaging-components/issues/199)) ([c3318cc](https://github.com/paypal/paypal-messaging-components/commit/c3318cc0ce5621d08b4a6c129887973555ae7b71))


### Features

* add dynamic apr ([#197](https://github.com/paypal/paypal-messaging-components/issues/197)) ([d6079c9](https://github.com/paypal/paypal-messaging-components/commit/d6079c93c5e485841e4d124616851bbd1f01843f))

# [1.9.0](https://github.com/paypal/paypal-messaging-components/compare/v1.8.0...v1.9.0) (2020-04-16)


### Features

* US modal apply now ([#144](https://github.com/paypal/paypal-messaging-components/issues/144)) ([1d8921d](https://github.com/paypal/paypal-messaging-components/commit/1d8921d871c9766548eb1523406fbbfbb776eb5d))

# [1.8.0](https://github.com/paypal/paypal-messaging-components/compare/v1.7.11...v1.8.0) (2020-04-15)


### Features

* add support for NI qualifying message ([#173](https://github.com/paypal/paypal-messaging-components/issues/173)) ([ef45a4f](https://github.com/paypal/paypal-messaging-components/commit/ef45a4fa32a287d6d6420ec6886cedd54434362e))

## [1.7.11](https://github.com/paypal/paypal-messaging-components/compare/v1.7.10...v1.7.11) (2020-04-01)


### Bug Fixes

* capture lander clicks ([#175](https://github.com/paypal/paypal-messaging-components/issues/175)) ([dd1c34b](https://github.com/paypal/paypal-messaging-components/commit/dd1c34b05defcebe4b2e030d0aa246d45b6ed94b))

## [1.7.10](https://github.com/paypal/paypal-messaging-components/compare/v1.7.9...v1.7.10) (2020-03-25)


### Bug Fixes

* ensure only one zoid component created ([#178](https://github.com/paypal/paypal-messaging-components/issues/178)) ([ff3efe4](https://github.com/paypal/paypal-messaging-components/commit/ff3efe4fd4341bb5c54520b2fbe6974e0e3572fe))
* pass merchant id with modal calculate call ([#174](https://github.com/paypal/paypal-messaging-components/issues/174)) ([f79d0ab](https://github.com/paypal/paypal-messaging-components/commit/f79d0ab102064744a3ae9113a482f58922b0539a))

## [1.7.9](https://github.com/paypal/paypal-messaging-components/compare/v1.7.8...v1.7.9) (2020-03-18)


### Bug Fixes

* center modal spinner in IE ([#171](https://github.com/paypal/paypal-messaging-components/issues/171)) ([1b0d52a](https://github.com/paypal/paypal-messaging-components/commit/1b0d52afa83d85dbb67382fdc3a8de92bcb3ad7a))
* pass merchant account with modal for partner integration ([#172](https://github.com/paypal/paypal-messaging-components/issues/172)) ([7dd347c](https://github.com/paypal/paypal-messaging-components/commit/7dd347c2e00fd1b24cf4f80048263a314934dcce))
* prevent multiple same modals from rendering ([#167](https://github.com/paypal/paypal-messaging-components/issues/167)) ([ce02f3e](https://github.com/paypal/paypal-messaging-components/commit/ce02f3e19c02678bf0f3b0df39dda5d6bdd13634))
* remove unsupported sandbox warning ([#168](https://github.com/paypal/paypal-messaging-components/issues/168)) ([da79c1d](https://github.com/paypal/paypal-messaging-components/commit/da79c1d8b3ff7882f1f5aa6fe225635d9a1b37fe))

## [1.7.8](https://github.com/paypal/paypal-messaging-components/compare/v1.7.7...v1.7.8) (2020-03-12)


### Bug Fixes

* ignore clicks on tracking pixel ([#165](https://github.com/paypal/paypal-messaging-components/issues/165)) ([f1512fb](https://github.com/paypal/paypal-messaging-components/commit/f1512fbf5fd13c824fcf9bfd73d142e2809994d1))

## [1.7.7](https://github.com/paypal/paypal-messaging-components/compare/v1.7.6...v1.7.7) (2020-03-06)

## [1.7.6](https://github.com/paypal/paypal-messaging-components/compare/v1.7.5...v1.7.6) (2020-03-06)


### Bug Fixes

* merchant.js mixed content ([#161](https://github.com/paypal/paypal-messaging-components/issues/161)) ([ad4b0e9](https://github.com/paypal/paypal-messaging-components/commit/ad4b0e92d0db2e92276c9e03618557451c3e3c31))

## [1.7.5](https://github.com/paypal/paypal-messaging-components/compare/v1.7.4...v1.7.5) (2020-03-05)


### Bug Fixes

* modal event tracking ([#159](https://github.com/paypal/paypal-messaging-components/issues/159)) ([38a297f](https://github.com/paypal/paypal-messaging-components/commit/38a297f3ad16529f5ad02af530e437bc543a324d))

## [1.7.4](https://github.com/paypal/paypal-messaging-components/compare/v1.7.3...v1.7.4) (2020-03-02)


### Bug Fixes

* revert scss for SDK bundler ([#154](https://github.com/paypal/paypal-messaging-components/issues/154)) ([ad6f7e1](https://github.com/paypal/paypal-messaging-components/commit/ad6f7e12691422b994cb544bd81a8b33e4caef2e))

## [1.7.3](https://github.com/paypal/paypal-messaging-components/compare/v1.7.2...v1.7.3) (2020-02-27)


### Bug Fixes

* move preact to devDependencies for SDK bundler ([#151](https://github.com/paypal/paypal-messaging-components/issues/151)) ([85fef66](https://github.com/paypal/paypal-messaging-components/commit/85fef66a02bf090b2cde7e9a1ffd4dc8face1f60))

## [1.7.2](https://github.com/paypal/paypal-messaging-components/compare/v1.7.1...v1.7.2) (2020-02-26)


### Bug Fixes

* add props for apply now modal backwards compatibility ([#147](https://github.com/paypal/paypal-messaging-components/issues/147)) ([5364eb7](https://github.com/paypal/paypal-messaging-components/commit/5364eb79bf49efce1fa47861d074a6f9d2b964d5))
* remove sandbox mocking ([#145](https://github.com/paypal/paypal-messaging-components/issues/145)) ([caa70ba](https://github.com/paypal/paypal-messaging-components/commit/caa70ba1b5de1455958f6cdbd44a311cce894d26))
* use Sass for compatibility with latest grumbler scripts ([#146](https://github.com/paypal/paypal-messaging-components/issues/146)) ([604f0e7](https://github.com/paypal/paypal-messaging-components/commit/604f0e7bc16febbdf6f3adec791d0da0f69838bb))

## [1.7.1](https://github.com/paypal/paypal-messaging-components/compare/v1.7.0...v1.7.1) (2020-02-20)


### Bug Fixes

* use popup for legacy image banners ([#142](https://github.com/paypal/paypal-messaging-components/issues/142)) ([53e8f04](https://github.com/paypal/paypal-messaging-components/commit/53e8f04d66e0406204df21aa1c0abdfba25dc86c))

# [1.7.0](https://github.com/paypal/paypal-messaging-components/compare/v1.6.1...v1.7.0) (2020-02-14)


### Bug Fixes

* gracefully handle 204 response ([#122](https://github.com/paypal/paypal-messaging-components/issues/122)) ([7f0262c](https://github.com/paypal/paypal-messaging-components/commit/7f0262c5b801e166cf7a0a9213d0119524bfdfe0))
* ie rendering issues ([#129](https://github.com/paypal/paypal-messaging-components/issues/129)) ([ede5d03](https://github.com/paypal/paypal-messaging-components/commit/ede5d03b984c0a5da4d4360654d097f9adf2499a))
* proper messageWidth mutations for PMG message ([#132](https://github.com/paypal/paypal-messaging-components/issues/132)) ([bdf6c55](https://github.com/paypal/paypal-messaging-components/commit/bdf6c55a72f34aea2ab1579e14ca8baa856a764a))


### Features

* zoid modal ([#135](https://github.com/paypal/paypal-messaging-components/issues/135)) ([25cc9bc](https://github.com/paypal/paypal-messaging-components/commit/25cc9bcf4a0e669e084b2780e025c87d293bbc5b))

## [1.6.1](https://github.com/paypal/paypal-messaging-components/compare/v1.6.0...v1.6.1) (2020-02-03)


### Bug Fixes

* remove JSON parse from terms fetcher ([#123](https://github.com/paypal/paypal-messaging-components/issues/123)) ([9519ea1](https://github.com/paypal/paypal-messaging-components/commit/9519ea1c56f2ba458b269f980cb3f15fdd8751a9))

# [1.6.0](https://github.com/paypal/paypal-messaging-components/compare/v1.5.1...v1.6.0) (2020-01-29)


### Bug Fixes

* font loading util for improved FireFox rendering ([#121](https://github.com/paypal/paypal-messaging-components/issues/121)) ([4264f99](https://github.com/paypal/paypal-messaging-components/commit/4264f99b96b7c8e07c7b4d9304125bf825b03a5e))
* increase alternative logo size ([#106](https://github.com/paypal/paypal-messaging-components/issues/106)) ([7eb3a4e](https://github.com/paypal/paypal-messaging-components/commit/7eb3a4effc881e0bcca5ec380bde5aa2644062bc))
* mock proper sandbox message response ([#113](https://github.com/paypal/paypal-messaging-components/issues/113)) ([2ed4d01](https://github.com/paypal/paypal-messaging-components/commit/2ed4d01b436cc0033cf36b2a54260b06498d30c1))


### Features

* adds mock UUID function for messageRequestId ([#116](https://github.com/paypal/paypal-messaging-components/issues/116)) ([9b1c807](https://github.com/paypal/paypal-messaging-components/commit/9b1c807ef8d667f133f149c0b2e2734cf3d607e3))

## [1.5.1](https://github.com/paypal/paypal-messaging-components/compare/v1.5.0...v1.5.1) (2020-01-14)


### Bug Fixes

* DE flex styles ([#107](https://github.com/paypal/paypal-messaging-components/issues/107)) ([a82e069](https://github.com/paypal/paypal-messaging-components/commit/a82e069b201a0ce49cff3cf514ddd92f847d2dbb))
* NI 1x4 banners ([#108](https://github.com/paypal/paypal-messaging-components/issues/108)) ([679a9eb](https://github.com/paypal/paypal-messaging-components/commit/679a9eb48be8bd15b2e9a2592c42074addee5d70))

# [1.5.0](https://github.com/paypal/paypal-messaging-components/compare/v1.4.1...v1.5.0) (2019-12-16)


### Bug Fixes

* allow cookies in cross-origin xhr ([#93](https://github.com/paypal/paypal-messaging-components/issues/93)) ([372e1ae](https://github.com/paypal/paypal-messaging-components/commit/372e1aea18f50f6acb15ceef52a5f0d6f6d7b3a9))
* custom banner render error ([#95](https://github.com/paypal/paypal-messaging-components/issues/95)) ([529e48c](https://github.com/paypal/paypal-messaging-components/commit/529e48cf5b150e0e55b7f2ab31904638dd13a218))
* DE link color and invalid terms display ([#96](https://github.com/paypal/paypal-messaging-components/issues/96)) ([e778287](https://github.com/paypal/paypal-messaging-components/commit/e77828713a1be2eb24ddd128d102fe2310a914ea))
* improve modal calculator input useability ([#82](https://github.com/paypal/paypal-messaging-components/issues/82)) ([17d81a9](https://github.com/paypal/paypal-messaging-components/commit/17d81a90ff6accb5354395f498f8e33b315577ff))
* lazily get logos object for custom banners ([#97](https://github.com/paypal/paypal-messaging-components/issues/97)) ([a22f05f](https://github.com/paypal/paypal-messaging-components/commit/a22f05f41689b2997f31715b7155f161348a51b8))
* use credentials only for banner request ([#98](https://github.com/paypal/paypal-messaging-components/issues/98)) ([ab0f7a0](https://github.com/paypal/paypal-messaging-components/commit/ab0f7a04e6bf204436aabb4dcad0a09546f00c6b))
* use normalized correlation ID header ([#94](https://github.com/paypal/paypal-messaging-components/issues/94)) ([ae7ffe7](https://github.com/paypal/paypal-messaging-components/commit/ae7ffe745d6db74df99b93fa955a7b2b49a64341))


### Features

* font size options ([#83](https://github.com/paypal/paypal-messaging-components/issues/83)) ([7e8ca0d](https://github.com/paypal/paypal-messaging-components/commit/7e8ca0d2082dc62775ce3b25cfa0b9b8ef1a6de2))
* font size options DE ([#100](https://github.com/paypal/paypal-messaging-components/issues/100)) ([14631e6](https://github.com/paypal/paypal-messaging-components/commit/14631e6978df40d244d379df54d2cae0711fe255))

## [1.4.1](https://github.com/paypal/paypal-messaging-components/compare/v1.4.0...v1.4.1) (2019-11-14)


### Bug Fixes

* currency prioritization ([#88](https://github.com/paypal/paypal-messaging-components/issues/88)) ([f71b6c3](https://github.com/paypal/paypal-messaging-components/commit/f71b6c3cf072ee4cb28648ddee66b426dc20ed09))

# [1.4.0](https://github.com/paypal/paypal-messaging-components/compare/v1.3.2...v1.4.0) (2019-11-12)


### Bug Fixes

* use pointer cursor over legacy banners ([#77](https://github.com/paypal/paypal-messaging-components/issues/77)) ([6638ef6](https://github.com/paypal/paypal-messaging-components/commit/6638ef699c9ddebd145b1e2688be1774d74df303))


### Features

* DE banner support ([#81](https://github.com/paypal/paypal-messaging-components/issues/81)) ([bd27c6c](https://github.com/paypal/paypal-messaging-components/commit/bd27c6c35f6deeee61118c45ec333a1af07ac2ad))

## [1.3.2](https://github.com/paypal/paypal-messaging-components/compare/v1.3.1...v1.3.2) (2019-11-06)


### Bug Fixes

* include banners folder with npm publish ([#79](https://github.com/paypal/paypal-messaging-components/issues/79)) ([b125721](https://github.com/paypal/paypal-messaging-components/commit/b125721d62ab95c07634518ff59763c40443a08d))

## [1.3.1](https://github.com/paypal/paypal-messaging-components/compare/v1.3.0...v1.3.1) (2019-11-05)


### Bug Fixes

* sandbox mock ([#76](https://github.com/paypal/paypal-messaging-components/issues/76)) ([4f5ec43](https://github.com/paypal/paypal-messaging-components/commit/4f5ec43b775f40bd806cb54ae62c415e91435053))

# [1.3.0](https://github.com/paypal/paypal-messaging-components/compare/v1.2.1...v1.3.0) (2019-10-29)


### Features

* window namespace override ([#74](https://github.com/paypal/paypal-messaging-components/issues/74)) ([66da542](https://github.com/paypal/paypal-messaging-components/commit/66da5429f46511b54a101162ea7ad30118f10edd))

## [1.2.1](https://github.com/paypal/paypal-messaging-components/compare/v1.2.0...v1.2.1) (2019-10-16)

# [1.2.0](https://github.com/paypal/paypal-messaging-components/compare/v1.1.4...v1.2.0) (2019-09-27)


### Bug Fixes

* log events for legacy custom banners ([#59](https://github.com/paypal/paypal-messaging-components/issues/59)) ([5365d30](https://github.com/paypal/paypal-messaging-components/commit/5365d30))


### Features

* offer type preference config option ([#62](https://github.com/paypal/paypal-messaging-components/issues/62)) ([6bb87e1](https://github.com/paypal/paypal-messaging-components/commit/6bb87e1))

### [1.1.4](https://github.com/paypal/paypal-messaging-components/compare/v1.1.3...v1.1.4) (2019-09-11)


### Bug Fixes

* 3 month ezp placement switch ([#55](https://github.com/paypal/paypal-messaging-components/issues/55)) ([eeb6dfe](https://github.com/paypal/paypal-messaging-components/commit/eeb6dfe))



### [1.1.3](https://github.com/paypal/paypal-messaging-components/compare/v1.1.2...v1.1.3) (2019-09-11)



### [1.1.2](https://github.com/paypal/paypal-messaging-components/compare/v1.1.1...v1.1.2) (2019-09-04)


### Bug Fixes

* handle FireFox async dynamic iframe creation ([#45](https://github.com/paypal/paypal-messaging-components/issues/45)) ([eb0f55e](https://github.com/paypal/paypal-messaging-components/commit/eb0f55e))



### [1.1.1](https://github.com/paypal/paypal-messaging-components/compare/v1.1.0...v1.1.1) (2019-08-23)


### Tests

* add basic Jest tests ([#2](https://github.com/paypal/paypal-messaging-components/issues/2)) ([1b58332](https://github.com/paypal/paypal-messaging-components/commit/1b58332))



### [1.1.0](https://github.com/paypal/paypal-messaging-components/compare/v1.0.6...v1.1.0) (2019-08-14)


### Features

* re-render when iframe container is moved around the DOM ([#15](https://github.com/paypal/paypal-messaging-components/issues/15)) ([d36d020](https://github.com/paypal/paypal-messaging-components/commit/d36d020))



### [1.0.6](https://github.com/paypal/paypal-messaging-components/compare/v1.0.5...v1.0.6) (2019-08-13)


### Bug Fixes

* handle preloaded images ([#35](https://github.com/paypal/paypal-messaging-components/issues/35)) ([3e2ac02](https://github.com/paypal/paypal-messaging-components/commit/3e2ac02))



### [1.0.5](https://github.com/paypal/paypal-messaging-components/compare/v1.0.4...v1.0.5) (2019-08-12)


### Bug Fixes

* correct minimum width calculation ([#33](https://github.com/paypal/paypal-messaging-components/issues/33)) ([f932a06](https://github.com/paypal/paypal-messaging-components/commit/f932a06))



### [1.0.4](https://github.com/paypal/paypal-messaging-components/compare/v1.0.3...v1.0.4) (2019-08-12)


### Bug Fixes

* legacy HTML banners properly apply style in IE and Edge ([#31](https://github.com/paypal/paypal-messaging-components/issues/31)) ([15326a2](https://github.com/paypal/paypal-messaging-components/commit/15326a2))



### [1.0.3](https://github.com/paypal/paypal-messaging-components/compare/v1.0.2...v1.0.3) (2019-08-01)


### Bug Fixes

* legacy pipeline bugs ([#25](https://github.com/paypal/paypal-messaging-components/issues/25)) ([41aceca](https://github.com/paypal/paypal-messaging-components/commit/41aceca))



### [1.0.2](https://github.com/paypal/paypal-messaging-components/compare/v1.0.0...v1.0.2) (2019-07-31)


### Bug Fixes

* pass currency code to imadserv ([#23](https://github.com/paypal/paypal-messaging-components/issues/23)) ([980f23a](https://github.com/paypal/paypal-messaging-components/commit/980f23a))
* prevent invalid option value passing through validation ([#16](https://github.com/paypal/paypal-messaging-components/issues/16)) ([cff36cb](https://github.com/paypal/paypal-messaging-components/commit/cff36cb))



### [1.0.1](https://github.com/paypal/paypal-messaging-components/compare/v1.0.0...v1.0.1) (2019-07-31)



### [1.0.0](https://github.com/paypal/paypal-messaging-components/compare/v0.4.1...v1.0.0) (2019-07-11)

### Bug Fixes

-   setup client id support ([#10](https://github.com/paypal/paypal-messaging-components/issues/10)) ([fca2dfb](https://github.com/paypal/paypal-messaging-components/commit/fca2dfb))
-   custom validation refactor ([#11](https://github.com/paypal/paypal-messaging-components/issues/11)) ([b6f5fce](https://github.com/paypal/paypal-messaging-components/commit/b6f5fce))
-   remove window.paypal dependency in legacy pipeline ([#8](https://github.com/paypal/paypal-messaging-components/issues/8)) ([d7ddd43](https://github.com/paypal/paypal-messaging-components/commit/d7ddd43))
-   update legacy LE map ([#4](https://github.com/paypal/paypal-messaging-components/issues/4)) ([758c484](https://github.com/paypal/paypal-messaging-components/commit/758c484))

### Features

-   rerender on container attribute changes ([#9](https://github.com/paypal/paypal-messaging-components/issues/9)) ([cf2f794](https://github.com/paypal/paypal-messaging-components/commit/cf2f794))

### [0.4.1](https://github.com/paypal/paypal-messaging-components/compare/v0.4.0...v0.4.1) (2019-06-19)

### Bug Fixes

-   use fetched custom markup to validate sign ([45dc002](https://github.com/paypal/paypal-messaging-components/commit/45dc002))

### [0.4.0](https://github.com/paypal/paypal-messaging-components/compare/v0.3.7...v0.4.0) (2019-06-17)

### Features

-   SDK release ([3e4982c](https://github.com/paypal/paypal-messaging-components/commit/3e4982c))

### [0.3.7](https://github.com/paypal/paypal-messaging-components/compare/v0.3.6...v0.3.7) (2019-06-06)

### 0.3.6 (2019-06-04)
