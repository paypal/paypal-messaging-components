# Changelog

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
