'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">@elementzerolabs/email-service documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-2a225d0a0ec4dadbcc6bccd9d184769be5c44e442da7a0dc752e3d4805b35f7eb196e1c207ba9854e502d46fe889061c0ace78d282dd171117f5eaf1a435b2d5"' : 'data-target="#xs-controllers-links-module-AppModule-2a225d0a0ec4dadbcc6bccd9d184769be5c44e442da7a0dc752e3d4805b35f7eb196e1c207ba9854e502d46fe889061c0ace78d282dd171117f5eaf1a435b2d5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-2a225d0a0ec4dadbcc6bccd9d184769be5c44e442da7a0dc752e3d4805b35f7eb196e1c207ba9854e502d46fe889061c0ace78d282dd171117f5eaf1a435b2d5"' :
                                            'id="xs-controllers-links-module-AppModule-2a225d0a0ec4dadbcc6bccd9d184769be5c44e442da7a0dc752e3d4805b35f7eb196e1c207ba9854e502d46fe889061c0ace78d282dd171117f5eaf1a435b2d5"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/s3UploadController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >s3UploadController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-2a225d0a0ec4dadbcc6bccd9d184769be5c44e442da7a0dc752e3d4805b35f7eb196e1c207ba9854e502d46fe889061c0ace78d282dd171117f5eaf1a435b2d5"' : 'data-target="#xs-injectables-links-module-AppModule-2a225d0a0ec4dadbcc6bccd9d184769be5c44e442da7a0dc752e3d4805b35f7eb196e1c207ba9854e502d46fe889061c0ace78d282dd171117f5eaf1a435b2d5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-2a225d0a0ec4dadbcc6bccd9d184769be5c44e442da7a0dc752e3d4805b35f7eb196e1c207ba9854e502d46fe889061c0ace78d282dd171117f5eaf1a435b2d5"' :
                                        'id="xs-injectables-links-module-AppModule-2a225d0a0ec4dadbcc6bccd9d184769be5c44e442da7a0dc752e3d4805b35f7eb196e1c207ba9854e502d46fe889061c0ace78d282dd171117f5eaf1a435b2d5"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ImageUploadService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ImageUploadService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PostMediaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostMediaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/s3UploadService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >s3UploadService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/s3UploadController.html" data-type="entity-link" >s3UploadController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Author.html" data-type="entity-link" >Author</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthorsResolver.html" data-type="entity-link" >AuthorsResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/createS3Dto.html" data-type="entity-link" >createS3Dto</a>
                            </li>
                            <li class="link">
                                <a href="classes/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/Post.html" data-type="entity-link" >Post</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostMedias.html" data-type="entity-link" >PostMedias</a>
                            </li>
                            <li class="link">
                                <a href="classes/s3UploadInput.html" data-type="entity-link" >s3UploadInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/s3UploadResolver.html" data-type="entity-link" >s3UploadResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/S3Uploads.html" data-type="entity-link" >S3Uploads</a>
                            </li>
                            <li class="link">
                                <a href="classes/s3UploadType.html" data-type="entity-link" >s3UploadType</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ImageUploadService.html" data-type="entity-link" >ImageUploadService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostMediaService.html" data-type="entity-link" >PostMediaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/s3UploadService.html" data-type="entity-link" >s3UploadService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});