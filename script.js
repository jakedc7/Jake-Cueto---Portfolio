/* =========================================================
   JAKE CUETO PORTFOLIO
   MAIN JAVASCRIPT
   WORKS ON:
   - index.html
   - certifications.html
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const header =
    document.querySelector(".header");

const menuButton =
    document.querySelector(".menu-button");

const navLinks =
    document.querySelector(".nav-links");


/* =========================================================
   HEADER
========================================================= */

window.addEventListener("scroll", () => {

    header?.classList.toggle(
        "scrolled",
        window.scrollY > 30
    );

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


document
    .querySelectorAll(".reveal")
    .forEach(element => {

        revealObserver.observe(element);

    });


/* =========================================================
   MOBILE MENU
   3-LINE HAMBURGER
========================================================= */

function openMobileMenu() {

    navLinks?.classList.add(
        "mobile-open"
    );

    menuButton?.setAttribute(
        "aria-expanded",
        "true"
    );

    menuButton?.setAttribute(
        "aria-label",
        "Close navigation"
    );

    document.body.classList.add(
        "mobile-menu-open"
    );

}


function closeMobileMenu() {

    navLinks?.classList.remove(
        "mobile-open"
    );

    menuButton?.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton?.setAttribute(
        "aria-label",
        "Open navigation"
    );

    document.body.classList.remove(
        "mobile-menu-open"
    );

}


menuButton?.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        const isOpen =
            menuButton.getAttribute(
                "aria-expanded"
            ) === "true";


        if (isOpen) {

            closeMobileMenu();

        } else {

            openMobileMenu();

        }

    }
);


/* Close after selecting any navigation item. */
navLinks
    ?.querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                closeMobileMenu();

            }
        );

    });


/* Close when clicking outside the navbar. */
document.addEventListener(
    "click",
    event => {

        if (
            !navLinks?.classList.contains(
                "mobile-open"
            )
        ) {
            return;
        }

        const target =
            event.target;

        if (
            target instanceof Element &&
            !target.closest(".navbar")
        ) {

            closeMobileMenu();

        }

    },
    true
);


/* Close with Escape. */
document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            navLinks?.classList.contains(
                "mobile-open"
            )
        ) {

            closeMobileMenu();

            menuButton?.focus();

        }

    }
);


/* Restore desktop navbar when leaving mobile width. */
window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 850
        ) {

            closeMobileMenu();

        }

    },
    { passive: true }
);


/* =========================================================
   NAVIGATION
   ACTIVE TAB + CLOSE MOBILE MENU
========================================================= */

document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".nav-links a"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });


                link.classList.add(
                    "active"
                );


                navLinks?.classList.remove(
                    "mobile-open"
                );


                menuButton?.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute("href");


                if (
                    !href ||
                    href === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(href);


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


/* =========================================================
   CURRENT YEAR
========================================================= */

const year =
    document.getElementById("year");


if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================================
   CONTACT
========================================================= */

const startConversationBtn =
    document.getElementById(
        "startConversationBtn"
    );

const emailReveal =
    document.getElementById(
        "emailReveal"
    );


if (
    startConversationBtn &&
    emailReveal
) {

    startConversationBtn.addEventListener(
        "click",
        () => {

            const isOpen =
                emailReveal.classList.toggle(
                    "show"
                );


            startConversationBtn.classList.toggle(
                "is-open",
                isOpen
            );


            startConversationBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            emailReveal.setAttribute(
                "aria-hidden",
                String(!isOpen)
            );

        }
    );

}


/* =========================================================
   PHOTO LIGHTBOX
========================================================= */

const photoLightbox =
    document.getElementById(
        "photoLightbox"
    );

const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );

const lightboxTitle =
    document.getElementById(
        "lightboxTitle"
    );

const lightboxClose =
    document.getElementById(
        "lightboxClose"
    );


const experiencePhotos =
    document.querySelectorAll(
        ".experience-photo"
    );


/* =========================================================
   OPEN EXPERIENCE PHOTO
========================================================= */

experiencePhotos.forEach(photo => {

    photo.addEventListener(
        "click",
        () => {

            const image =
                photo.dataset.image;

            const title =
                photo.dataset.title;


            if (
                !photoLightbox ||
                !lightboxImage ||
                !lightboxTitle
            ) {
                return;
            }


            lightboxImage.src =
                image;


            lightboxImage.alt =
                title ||
                "Experience photo";


            lightboxImage.setAttribute(
                "draggable",
                "false"
            );


            lightboxTitle.textContent =
                title || "";


            photoLightbox.classList.add(
                "open"
            );


            photoLightbox.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.style.overflow =
                "hidden";

        }
    );

});


/* =========================================================
   CLOSE LIGHTBOX
========================================================= */

function closeLightbox() {

    if (!photoLightbox) {
        return;
    }


    photoLightbox.classList.remove(
        "open"
    );


    photoLightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";


    if (lightboxImage) {

        lightboxImage.src = "";

    }

}


lightboxClose?.addEventListener(
    "click",
    closeLightbox
);


/* =========================================================
   CLOSE LIGHTBOX WHEN CLICKING OUTSIDE IMAGE
========================================================= */

photoLightbox?.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            photoLightbox
        ) {

            closeLightbox();

        }

    }
);


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeLightbox();

        }

    }
);


/* =========================================================
   HERO 3D INTERACTION
========================================================= */

const visual =
    document.querySelector(
        ".hero-visual"
    );

const card =
    document.querySelector(
        ".profile-card"
    );


if (
    visual &&
    card &&
    window.matchMedia(
        "(pointer:fine)"
    ).matches
) {

    visual.addEventListener(
        "pointermove",
        event => {

            const rect =
                visual.getBoundingClientRect();


            const x =
                (event.clientX - rect.left)
                / rect.width - 0.5;


            const y =
                (event.clientY - rect.top)
                / rect.height - 0.5;


            card.style.transform =
                `
                rotate(${4 + x * 4}deg)
                translate(${x * 6}px, ${y * 6}px)
                `;

        }
    );


    visual.addEventListener(
        "pointerleave",
        () => {

            card.style.transform =
                "rotate(4deg)";

        }
    );

}


/* =========================================================
   =========================================================
   IMAGE PROTECTION
   WORKS ON BOTH PAGES
   =========================================================
   ========================================================= */


/* =========================================================
   SHOW IMAGE PROTECTION MESSAGE
========================================================= */

function showImageProtectionMessage() {

    const existingMessage =
        document.querySelector(
            ".image-protection-message"
        );


    if (existingMessage) {

        existingMessage.remove();

    }


    const message =
        document.createElement("div");


    message.className =
        "image-protection-message";


    message.innerHTML = `
        <div
            class="image-protection-content"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="imageProtectionTitle"
        >

            <div class="image-protection-icon">
                ⚠️
            </div>


            <div
                class="image-protection-title"
                id="imageProtectionTitle"
            >
                Image Protected
            </div>


            <div class="image-protection-text">
                This image is protected.
                Saving, downloading, copying,
                or directly opening the original
                image is not allowed.
            </div>


            <button
                type="button"
                class="image-protection-close"
                aria-label="Close protection message"
            >
                OK
            </button>

        </div>
    `;


    document.body.appendChild(
        message
    );


    requestAnimationFrame(() => {

        message.classList.add(
            "show"
        );

    });


    const closeButton =
        message.querySelector(
            ".image-protection-close"
        );


    closeButton?.addEventListener(
        "click",
        closeImageProtectionMessage
    );


    setTimeout(() => {

        closeImageProtectionMessage();

    }, 4000);

}


/* =========================================================
   CLOSE IMAGE PROTECTION MESSAGE
========================================================= */

function closeImageProtectionMessage() {

    const message =
        document.querySelector(
            ".image-protection-message"
        );


    if (!message) {
        return;
    }


    message.classList.remove(
        "show"
    );


    setTimeout(() => {

        if (message.parentNode) {

            message.remove();

        }

    }, 250);

}


/* =========================================================
   CHECK IF TARGET IS AN IMAGE
========================================================= */

function isProtectedImage(target) {

    if (!target) {
        return false;
    }


    if (
        target instanceof HTMLImageElement
    ) {

        return true;

    }


    if (
        target instanceof Element
    ) {

        return !!target.closest(
            [
                "img",
                ".protected-photo",
                ".certificate-photo",
                ".certificate-card",
                ".certificate-image",
                ".experience-photo",
                ".profile-card",
                "#photoLightbox"
            ].join(", ")
        );

    }


    return false;

}


/* =========================================================
   PROTECT ALL IMAGES
========================================================= */

function protectAllImages() {

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(img => {

        img.setAttribute(
            "draggable",
            "false"
        );


        img.setAttribute(
            "ondragstart",
            "return false;"
        );


        img.style.userSelect =
            "none";

        img.style.webkitUserSelect =
            "none";


        img.addEventListener(
            "dragstart",
            event => {

                event.preventDefault();

                event.stopPropagation();

                showImageProtectionMessage();

            },
            true
        );


        img.addEventListener(
            "contextmenu",
            event => {

                event.preventDefault();

                event.stopPropagation();

                event.stopImmediatePropagation();

                showImageProtectionMessage();

                return false;

            },
            true
        );


        img.addEventListener(
            "mousedown",
            event => {

                if (
                    event.button === 1
                ) {

                    event.preventDefault();

                    event.stopPropagation();

                    showImageProtectionMessage();

                }

            },
            true
        );

    });

}


/* =========================================================
   GLOBAL RIGHT-CLICK PROTECTION
========================================================= */

document.addEventListener(
    "contextmenu",
    event => {

        const target =
            event.target;


        if (
            isProtectedImage(target)
        ) {

            event.preventDefault();

            event.stopPropagation();

            event.stopImmediatePropagation();


            showImageProtectionMessage();


            return false;

        }

    },
    true
);


/* =========================================================
   GLOBAL DRAG PROTECTION
========================================================= */

document.addEventListener(
    "dragstart",
    event => {

        const target =
            event.target;


        if (
            isProtectedImage(target)
        ) {

            event.preventDefault();

            event.stopPropagation();

            event.stopImmediatePropagation();


            showImageProtectionMessage();


            return false;

        }

    },
    true
);


/* =========================================================
   GLOBAL MIDDLE MOUSE PROTECTION
========================================================= */

document.addEventListener(
    "mousedown",
    event => {

        const target =
            event.target;


        if (
            event.button === 1 &&
            isProtectedImage(target)
        ) {

            event.preventDefault();

            event.stopPropagation();

            showImageProtectionMessage();

        }

    },
    true
);


/* =========================================================
   COPY PROTECTION
========================================================= */

document.addEventListener(
    "copy",
    event => {

        const selection =
            window.getSelection();


        if (
            !selection ||
            selection.rangeCount === 0
        ) {
            return;
        }


        const range =
            selection.getRangeAt(0);


        const container =
            range.commonAncestorContainer;


        const element =
            container.nodeType === 1
                ? container
                : container.parentElement;


        if (
            element &&
            isProtectedImage(element)
        ) {

            event.preventDefault();

            event.stopPropagation();

            showImageProtectionMessage();

        }

    },
    true
);


/* =========================================================
   CUT PROTECTION
========================================================= */

document.addEventListener(
    "cut",
    event => {

        if (
            isProtectedImage(
                event.target
            )
        ) {

            event.preventDefault();

            event.stopPropagation();

            showImageProtectionMessage();

        }

    },
    true
);


/* =========================================================
   KEYBOARD PROTECTION
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        const key =
            event.key.toLowerCase();


        const modifier =
            event.ctrlKey ||
            event.metaKey;


        if (
            modifier &&
            key === "s"
        ) {

            event.preventDefault();

            event.stopPropagation();

            showImageProtectionMessage();

            return;

        }


        if (
            modifier &&
            event.shiftKey &&
            key === "s"
        ) {

            event.preventDefault();

            event.stopPropagation();

            showImageProtectionMessage();

            return;

        }


        if (
            modifier &&
            key === "c"
        ) {

            const selection =
                window.getSelection();


            if (
                selection &&
                selection.rangeCount > 0
            ) {

                const range =
                    selection.getRangeAt(0);


                const container =
                    range.commonAncestorContainer;


                const element =
                    container.nodeType === 1
                        ? container
                        : container.parentElement;


                if (
                    element &&
                    isProtectedImage(element)
                ) {

                    event.preventDefault();

                    event.stopPropagation();

                    showImageProtectionMessage();

                }

            }

        }

    },
    true
);


/* =========================================================
   SELECT START PROTECTION
========================================================= */

document.addEventListener(
    "selectstart",
    event => {

        if (
            isProtectedImage(
                event.target
            )
        ) {

            event.preventDefault();

        }

    },
    true
);


/* =========================================================
   LIGHTBOX EXTRA PROTECTION
========================================================= */

if (lightboxImage) {

    lightboxImage.setAttribute(
        "draggable",
        "false"
    );


    lightboxImage.addEventListener(
        "contextmenu",
        event => {

            event.preventDefault();

            event.stopPropagation();

            event.stopImmediatePropagation();

            showImageProtectionMessage();

            return false;

        },
        true
    );


    lightboxImage.addEventListener(
        "dragstart",
        event => {

            event.preventDefault();

            event.stopPropagation();

            showImageProtectionMessage();

        },
        true
    );

}


/* =========================================================
   PROTECTED PHOTO CONTAINERS
========================================================= */

document
    .querySelectorAll(
        [
            ".protected-photo",
            ".certificate-photo",
            ".certificate-card",
            ".certificate-image",
            ".experience-photo",
            ".profile-card"
        ].join(", ")
    )
    .forEach(container => {

        container.addEventListener(
            "contextmenu",
            event => {

                event.preventDefault();

                event.stopPropagation();

                event.stopImmediatePropagation();

                showImageProtectionMessage();

                return false;

            },
            true
        );


        container.addEventListener(
            "dragstart",
            event => {

                event.preventDefault();

                event.stopPropagation();

                showImageProtectionMessage();

            },
            true
        );

    });


/* =========================================================
   CERTIFICATE LIGHTBOX / GENERIC LIGHTBOX
========================================================= */

if (photoLightbox) {

    photoLightbox.addEventListener(
        "contextmenu",
        event => {

            if (
                isProtectedImage(
                    event.target
                )
            ) {

                event.preventDefault();

                event.stopPropagation();

                event.stopImmediatePropagation();

                showImageProtectionMessage();

                return false;

            }

        },
        true
    );


    photoLightbox.addEventListener(
        "dragstart",
        event => {

            if (
                isProtectedImage(
                    event.target
                )
            ) {

                event.preventDefault();

                event.stopPropagation();

                showImageProtectionMessage();

            }

        },
        true
    );

}


/* =========================================================
   EXPAND BUTTON
   CERTIFICATE / DIPLOMA → LIGHTBOX
========================================================= */

const expandButtons =
    document.querySelectorAll(
        ".expand-btn"
    );


expandButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const image =
                button.dataset.image;

            const title =
                button.dataset.title;


            if (
                !photoLightbox ||
                !lightboxImage ||
                !lightboxTitle
            ) {
                return;
            }


            lightboxImage.src =
                image;


            lightboxImage.alt =
                title ||
                "Certificate";


            lightboxImage.setAttribute(
                "draggable",
                "false"
            );


            lightboxTitle.textContent =
                title || "";


            photoLightbox.classList.add(
                "open"
            );


            photoLightbox.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.style.overflow =
                "hidden";

        }
    );

});


/* =========================================================
   INITIALIZE IMAGE PROTECTION
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        protectAllImages
    );

} else {

    protectAllImages();

}
