(function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define("GOVUKFrontend", [ "exports" ], factory) : factory(global.GOVUKFrontend = {});
})(this, function(exports) {
    "use strict";
    function nodeListForEach(nodes, callback) {
        if (window.NodeList.prototype.forEach) {
            return nodes.forEach(callback);
        }
        for (var i = 0; i < nodes.length; i++) {
            callback.call(window, nodes[i], i, nodes);
        }
    }
    function generateUniqueID() {
        var d = new Date().getTime();
        if (typeof window.performance !== "undefined" && typeof window.performance.now === "function") {
            d += window.performance.now();
        }
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === "x" ? r : r & 3 | 8).toString(16);
        });
    }
    (function(undefined) {
        var detect = "defineProperty" in Object && function() {
            try {
                var a = {};
                Object.defineProperty(a, "test", {
                    value: 42
                });
                return true;
            } catch (e) {
                return false;
            }
        }();
        if (detect) return;
        (function(nativeDefineProperty) {
            var supportsAccessors = Object.prototype.hasOwnProperty("__defineGetter__");
            var ERR_ACCESSORS_NOT_SUPPORTED = "Getters & setters cannot be defined on this javascript engine";
            var ERR_VALUE_ACCESSORS = "A property cannot both have accessors and be writable or have a value";
            Object.defineProperty = function defineProperty(object, property, descriptor) {
                if (nativeDefineProperty && (object === window || object === document || object === Element.prototype || object instanceof Element)) {
                    return nativeDefineProperty(object, property, descriptor);
                }
                if (object === null || !(object instanceof Object || typeof object === "object")) {
                    throw new TypeError("Object.defineProperty called on non-object");
                }
                if (!(descriptor instanceof Object)) {
                    throw new TypeError("Property description must be an object");
                }
                var propertyString = String(property);
                var hasValueOrWritable = "value" in descriptor || "writable" in descriptor;
                var getterType = "get" in descriptor && typeof descriptor.get;
                var setterType = "set" in descriptor && typeof descriptor.set;
                if (getterType) {
                    if (getterType !== "function") {
                        throw new TypeError("Getter must be a function");
                    }
                    if (!supportsAccessors) {
                        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
                    }
                    if (hasValueOrWritable) {
                        throw new TypeError(ERR_VALUE_ACCESSORS);
                    }
                    Object.__defineGetter__.call(object, propertyString, descriptor.get);
                } else {
                    object[propertyString] = descriptor.value;
                }
                if (setterType) {
                    if (setterType !== "function") {
                        throw new TypeError("Setter must be a function");
                    }
                    if (!supportsAccessors) {
                        throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
                    }
                    if (hasValueOrWritable) {
                        throw new TypeError(ERR_VALUE_ACCESSORS);
                    }
                    Object.__defineSetter__.call(object, propertyString, descriptor.set);
                }
                if ("value" in descriptor) {
                    object[propertyString] = descriptor.value;
                }
                return object;
            };
        })(Object.defineProperty);
    }).call("object" === typeof window && window || "object" === typeof self && self || "object" === typeof global && global || {});
    (function(undefined) {
        var detect = "bind" in Function.prototype;
        if (detect) return;
        Object.defineProperty(Function.prototype, "bind", {
            value: function bind(that) {
                var $Array = Array;
                var $Object = Object;
                var ObjectPrototype = $Object.prototype;
                var ArrayPrototype = $Array.prototype;
                var Empty = function Empty() {};
                var to_string = ObjectPrototype.toString;
                var hasToStringTag = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
                var isCallable;
                var fnToStr = Function.prototype.toString, tryFunctionObject = function tryFunctionObject(value) {
                    try {
                        fnToStr.call(value);
                        return true;
                    } catch (e) {
                        return false;
                    }
                }, fnClass = "[object Function]", genClass = "[object GeneratorFunction]";
                isCallable = function isCallable(value) {
                    if (typeof value !== "function") {
                        return false;
                    }
                    if (hasToStringTag) {
                        return tryFunctionObject(value);
                    }
                    var strClass = to_string.call(value);
                    return strClass === fnClass || strClass === genClass;
                };
                var array_slice = ArrayPrototype.slice;
                var array_concat = ArrayPrototype.concat;
                var array_push = ArrayPrototype.push;
                var max = Math.max;
                var target = this;
                if (!isCallable(target)) {
                    throw new TypeError("Function.prototype.bind called on incompatible " + target);
                }
                var args = array_slice.call(arguments, 1);
                var bound;
                var binder = function() {
                    if (this instanceof bound) {
                        var result = target.apply(this, array_concat.call(args, array_slice.call(arguments)));
                        if ($Object(result) === result) {
                            return result;
                        }
                        return this;
                    } else {
                        return target.apply(that, array_concat.call(args, array_slice.call(arguments)));
                    }
                };
                var boundLength = max(0, target.length - args.length);
                var boundArgs = [];
                for (var i = 0; i < boundLength; i++) {
                    array_push.call(boundArgs, "$" + i);
                }
                bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this, arguments); }")(binder);
                if (target.prototype) {
                    Empty.prototype = target.prototype;
                    bound.prototype = new Empty();
                    Empty.prototype = null;
                }
                return bound;
            }
        });
    }).call("object" === typeof window && window || "object" === typeof self && self || "object" === typeof global && global || {});
    (function(undefined) {
        var detect = "DOMTokenList" in this && function(x) {
            return "classList" in x ? !x.classList.toggle("x", false) && !x.className : true;
        }(document.createElement("x"));
        if (detect) return;
        (function(global) {
            var nativeImpl = "DOMTokenList" in global && global.DOMTokenList;
            if (!nativeImpl || !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg") && !(document.createElementNS("http://www.w3.org/2000/svg", "svg").classList instanceof DOMTokenList)) {
                global.DOMTokenList = function() {
                    var dpSupport = true;
                    var defineGetter = function(object, name, fn, configurable) {
                        if (Object.defineProperty) Object.defineProperty(object, name, {
                            configurable: false === dpSupport ? true : !!configurable,
                            get: fn
                        }); else object.__defineGetter__(name, fn);
                    };
                    try {
                        defineGetter({}, "support");
                    } catch (e) {
                        dpSupport = false;
                    }
                    var _DOMTokenList = function(el, prop) {
                        var that = this;
                        var tokens = [];
                        var tokenMap = {};
                        var length = 0;
                        var maxLength = 0;
                        var addIndexGetter = function(i) {
                            defineGetter(that, i, function() {
                                preop();
                                return tokens[i];
                            }, false);
                        };
                        var reindex = function() {
                            if (length >= maxLength) for (;maxLength < length; ++maxLength) {
                                addIndexGetter(maxLength);
                            }
                        };
                        var preop = function() {
                            var error;
                            var i;
                            var args = arguments;
                            var rSpace = /\s+/;
                            if (args.length) for (i = 0; i < args.length; ++i) if (rSpace.test(args[i])) {
                                error = new SyntaxError('String "' + args[i] + '" ' + "contains" + " an invalid character");
                                error.code = 5;
                                error.name = "InvalidCharacterError";
                                throw error;
                            }
                            if (typeof el[prop] === "object") {
                                tokens = ("" + el[prop].baseVal).replace(/^\s+|\s+$/g, "").split(rSpace);
                            } else {
                                tokens = ("" + el[prop]).replace(/^\s+|\s+$/g, "").split(rSpace);
                            }
                            if ("" === tokens[0]) tokens = [];
                            tokenMap = {};
                            for (i = 0; i < tokens.length; ++i) tokenMap[tokens[i]] = true;
                            length = tokens.length;
                            reindex();
                        };
                        preop();
                        defineGetter(that, "length", function() {
                            preop();
                            return length;
                        });
                        that.toLocaleString = that.toString = function() {
                            preop();
                            return tokens.join(" ");
                        };
                        that.item = function(idx) {
                            preop();
                            return tokens[idx];
                        };
                        that.contains = function(token) {
                            preop();
                            return !!tokenMap[token];
                        };
                        that.add = function() {
                            preop.apply(that, args = arguments);
                            for (var args, token, i = 0, l = args.length; i < l; ++i) {
                                token = args[i];
                                if (!tokenMap[token]) {
                                    tokens.push(token);
                                    tokenMap[token] = true;
                                }
                            }
                            if (length !== tokens.length) {
                                length = tokens.length >>> 0;
                                if (typeof el[prop] === "object") {
                                    el[prop].baseVal = tokens.join(" ");
                                } else {
                                    el[prop] = tokens.join(" ");
                                }
                                reindex();
                            }
                        };
                        that.remove = function() {
                            preop.apply(that, args = arguments);
                            for (var args, ignore = {}, i = 0, t = []; i < args.length; ++i) {
                                ignore[args[i]] = true;
                                delete tokenMap[args[i]];
                            }
                            for (i = 0; i < tokens.length; ++i) if (!ignore[tokens[i]]) t.push(tokens[i]);
                            tokens = t;
                            length = t.length >>> 0;
                            if (typeof el[prop] === "object") {
                                el[prop].baseVal = tokens.join(" ");
                            } else {
                                el[prop] = tokens.join(" ");
                            }
                            reindex();
                        };
                        that.toggle = function(token, force) {
                            preop.apply(that, [ token ]);
                            if (undefined !== force) {
                                if (force) {
                                    that.add(token);
                                    return true;
                                } else {
                                    that.remove(token);
                                    return false;
                                }
                            }
                            if (tokenMap[token]) {
                                that.remove(token);
                                return false;
                            }
                            that.add(token);
                            return true;
                        };
                        return that;
                    };
                    return _DOMTokenList;
                }();
            }
            (function() {
                var e = document.createElement("span");
                if (!("classList" in e)) return;
                e.classList.toggle("x", false);
                if (!e.classList.contains("x")) return;
                e.classList.constructor.prototype.toggle = function toggle(token) {
                    var force = arguments[1];
                    if (force === undefined) {
                        var add = !this.contains(token);
                        this[add ? "add" : "remove"](token);
                        return add;
                    }
                    force = !!force;
                    this[force ? "add" : "remove"](token);
                    return force;
                };
            })();
            (function() {
                var e = document.createElement("span");
                if (!("classList" in e)) return;
                e.classList.add("a", "b");
                if (e.classList.contains("b")) return;
                var native = e.classList.constructor.prototype.add;
                e.classList.constructor.prototype.add = function() {
                    var args = arguments;
                    var l = arguments.length;
                    for (var i = 0; i < l; i++) {
                        native.call(this, args[i]);
                    }
                };
            })();
            (function() {
                var e = document.createElement("span");
                if (!("classList" in e)) return;
                e.classList.add("a");
                e.classList.add("b");
                e.classList.remove("a", "b");
                if (!e.classList.contains("b")) return;
                var native = e.classList.constructor.prototype.remove;
                e.classList.constructor.prototype.remove = function() {
                    var args = arguments;
                    var l = arguments.length;
                    for (var i = 0; i < l; i++) {
                        native.call(this, args[i]);
                    }
                };
            })();
        })(this);
    }).call("object" === typeof window && window || "object" === typeof self && self || "object" === typeof global && global || {});
    (function(undefined) {
        var detect = "Document" in this;
        if (detect) return;
        if (typeof WorkerGlobalScope === "undefined" && typeof importScripts !== "function") {
            if (this.HTMLDocument) {
                this.Document = this.HTMLDocument;
            } else {
                this.Document = this.HTMLDocument = document.constructor = new Function("return function Document() {}")();
                this.Document.prototype = document;
            }
        }
    }).call("object" === typeof window && window || "object" === typeof self && self || "object" === typeof global && global || {});
    (function(undefined) {
        var detect = "Element" in this && "HTMLElement" in this;
        if (detect) return;
        (function() {
            if (window.Element && !window.HTMLElement) {
                window.HTMLElement = window.Element;
                return;
            }
            window.Element = window.HTMLElement = new Function("return function Element() {}")();
            var vbody = document.appendChild(document.createElement("body"));
            var frame = vbody.appendChild(document.createElement("iframe"));
            var frameDocument = frame.contentWindow.document;
            var prototype = Element.prototype = frameDocument.appendChild(frameDocument.createElement("*"));
            var cache = {};
            var shiv = function(element, deep) {
                var childNodes = element.childNodes || [], index = -1, key, value, childNode;
                if (element.nodeType === 1 && element.constructor !== Element) {
                    element.constructor = Element;
                    for (key in cache) {
                        value = cache[key];
                        element[key] = value;
                    }
                }
                while (childNode = deep && childNodes[++index]) {
                    shiv(childNode, deep);
                }
                return element;
            };
            var elements = document.getElementsByTagName("*");
            var nativeCreateElement = document.createElement;
            var interval;
            var loopLimit = 100;
            prototype.attachEvent("onpropertychange", function(event) {
                var propertyName = event.propertyName, nonValue = !cache.hasOwnProperty(propertyName), newValue = prototype[propertyName], oldValue = cache[propertyName], index = -1, element;
                while (element = elements[++index]) {
                    if (element.nodeType === 1) {
                        if (nonValue || element[propertyName] === oldValue) {
                            element[propertyName] = newValue;
                        }
                    }
                }
                cache[propertyName] = newValue;
            });
            prototype.constructor = Element;
            if (!prototype.hasAttribute) {
                prototype.hasAttribute = function hasAttribute(name) {
                    return this.getAttribute(name) !== null;
                };
            }
            function bodyCheck() {
                if (!loopLimit--) clearTimeout(interval);
                if (document.body && !document.body.prototype && /(complete|interactive)/.test(document.readyState)) {
                    shiv(document, true);
                    if (interval && document.body.prototype) clearTimeout(interval);
                    return !!document.body.prototype;
                }
                return false;
            }
            if (!bodyCheck()) {
                document.onreadystatechange = bodyCheck;
                interval = setInterval(bodyCheck, 25);
            }
            document.createElement = function createElement(nodeName) {
                var element = nativeCreateElement(String(nodeName).toLowerCase());
                return shiv(element);
            };
            document.removeChild(vbody);
        })();
    }).call("object" === typeof window && window || "object" === typeof self && self || "object" === typeof global && global || {});
    (function(undefined) {
        var detect = "document" in this && "classList" in document.documentElement && "Element" in this && "classList" in Element.prototype && function() {
            var e = document.createElement("span");
            e.classList.add("a", "b");
            return e.classList.contains("b");
        }();
        if (detect) return;
        (function(global) {
            var dpSupport = true;
            var defineGetter = function(object, name, fn, configurable) {
                if (Object.defineProperty) Object.defineProperty(object, name, {
                    configurable: false === dpSupport ? true : !!configurable,
                    get: fn
                }); else object.__defineGetter__(name, fn);
            };
            try {
                defineGetter({}, "support");
            } catch (e) {
                dpSupport = false;
            }
            var addProp = function(o, name, attr) {
                defineGetter(o.prototype, name, function() {
                    var tokenList;
                    var THIS = this, gibberishProperty = "__defineGetter__" + "DEFINE_PROPERTY" + name;
                    if (THIS[gibberishProperty]) return tokenList;
                    THIS[gibberishProperty] = true;
                    if (false === dpSupport) {
                        var visage;
                        var mirror = addProp.mirror || document.createElement("div");
                        var reflections = mirror.childNodes;
                        var l = reflections.length;
                        for (var i = 0; i < l; ++i) if (reflections[i]._R === THIS) {
                            visage = reflections[i];
                            break;
                        }
                        visage || (visage = mirror.appendChild(document.createElement("div")));
                        tokenList = DOMTokenList.call(visage, THIS, attr);
                    } else tokenList = new DOMTokenList(THIS, attr);
                    defineGetter(THIS, name, function() {
                        return tokenList;
                    });
                    delete THIS[gibberishProperty];
                    return tokenList;
                }, true);
            };
            addProp(global.Element, "classList", "className");
            addProp(global.HTMLElement, "classList", "className");
            addProp(global.HTMLLinkElement, "relList", "rel");
            addProp(global.HTMLAnchorElement, "relList", "rel");
            addProp(global.HTMLAreaElement, "relList", "rel");
        })(this);
    }).call("object" === typeof window && window || "object" === typeof self && self || "object" === typeof global && global || {});
    function Accordion($module) {
        this.$module = $module;
        this.moduleId = $module.getAttribute("id");
        this.$sections = $module.querySelectorAll(".govuk-accordion__section");
        this.$showAllButton = "";
        this.browserSupportsSessionStorage = helper.checkForSessionStorage();
        this.controlsClass = "govuk-accordion__controls";
        this.showAllClass = "govuk-accordion__show-all";
        this.showAllTextClass = "govuk-accordion__show-all-text";
        this.sectionExpandedClass = "govuk-accordion__section--expanded";
        this.sectionButtonClass = "govuk-accordion__section-button";
        this.sectionHeaderClass = "govuk-accordion__section-header";
        this.sectionHeadingClass = "govuk-accordion__section-heading";
        this.sectionHeadingTextClass = "govuk-accordion__section-heading-text";
        this.sectionHeadingTextFocusClass = "govuk-accordion__section-heading-text-focus";
        this.sectionShowHideToggleClass = "govuk-accordion__section-toggle";
        this.sectionShowHideToggleFocusClass = "govuk-accordion__section-toggle-focus";
        this.sectionShowHideTextClass = "govuk-accordion__section-toggle-text";
        this.upChevronIconClass = "govuk-accordion-nav__chevron";
        this.downChevronIconClass = "govuk-accordion-nav__chevron--down";
        this.sectionSummaryClass = "govuk-accordion__section-summary";
        this.sectionSummaryFocusClass = "govuk-accordion__section-summary-focus";
    }
    Accordion.prototype.init = function() {
        if (!this.$module) {
            return;
        }
        this.initControls();
        this.initSectionHeaders();
        var areAllSectionsOpen = this.checkIfAllSectionsOpen();
        this.updateShowAllButton(areAllSectionsOpen);
    };
    Accordion.prototype.initControls = function() {
        this.$showAllButton = document.createElement("button");
        this.$showAllButton.setAttribute("type", "button");
        this.$showAllButton.setAttribute("class", this.showAllClass);
        this.$showAllButton.setAttribute("aria-expanded", "false");
        var $icon = document.createElement("span");
        $icon.classList.add(this.upChevronIconClass);
        this.$showAllButton.appendChild($icon);
        var $accordionControls = document.createElement("div");
        $accordionControls.setAttribute("class", this.controlsClass);
        $accordionControls.appendChild(this.$showAllButton);
        this.$module.insertBefore($accordionControls, this.$module.firstChild);
        var $wrappershowAllText = document.createElement("span");
        $wrappershowAllText.classList.add(this.showAllTextClass);
        this.$showAllButton.appendChild($wrappershowAllText);
        this.$showAllButton.addEventListener("click", this.onShowOrHideAllToggle.bind(this));
    };
    Accordion.prototype.initSectionHeaders = function() {
        nodeListForEach(this.$sections, function($section, i) {
            var $header = $section.querySelector("." + this.sectionHeaderClass);
            this.constructHeaderMarkup($header, i);
            this.setExpanded(this.isExpanded($section), $section);
            $header.addEventListener("click", this.onSectionToggle.bind(this, $section));
            this.setInitialState($section);
        }.bind(this));
    };
    Accordion.prototype.constructHeaderMarkup = function($headerWrapper, index) {
        var $span = $headerWrapper.querySelector("." + this.sectionButtonClass);
        var $heading = $headerWrapper.querySelector("." + this.sectionHeadingClass);
        var $summary = $headerWrapper.querySelector("." + this.sectionSummaryClass);
        var $button = document.createElement("button");
        $button.setAttribute("type", "button");
        $button.setAttribute("aria-controls", this.moduleId + "-content-" + (index + 1));
        for (var i = 0; i < $span.attributes.length; i++) {
            var attr = $span.attributes.item(i);
            if (attr.nodeName !== "id") {
                $button.setAttribute(attr.nodeName, attr.nodeValue);
            }
        }
        var $headingText = document.createElement("span");
        $headingText.classList.add(this.sectionHeadingTextClass);
        $headingText.id = $span.id;
        var $headingTextFocus = document.createElement("span");
        $headingTextFocus.classList.add(this.sectionHeadingTextFocusClass);
        $headingText.appendChild($headingTextFocus);
        $headingTextFocus.innerHTML = $span.innerHTML;
        var $showToggle = document.createElement("span");
        $showToggle.classList.add(this.sectionShowHideToggleClass);
        $showToggle.setAttribute("data-nosnippet", "");
        var $showToggleFocus = document.createElement("span");
        $showToggleFocus.classList.add(this.sectionShowHideToggleFocusClass);
        $showToggle.appendChild($showToggleFocus);
        var $showToggleText = document.createElement("span");
        var $icon = document.createElement("span");
        $icon.classList.add(this.upChevronIconClass);
        $showToggleFocus.appendChild($icon);
        $showToggleText.classList.add(this.sectionShowHideTextClass);
        $showToggleFocus.appendChild($showToggleText);
        $button.appendChild($headingText);
        $button.appendChild(this.getButtonPunctuationEl());
        if (typeof $summary !== "undefined" && $summary !== null) {
            var $summarySpan = document.createElement("span");
            var $summarySpanFocus = document.createElement("span");
            $summarySpanFocus.classList.add(this.sectionSummaryFocusClass);
            $summarySpan.appendChild($summarySpanFocus);
            for (var j = 0, l = $summary.attributes.length; j < l; ++j) {
                var nodeName = $summary.attributes.item(j).nodeName;
                var nodeValue = $summary.attributes.item(j).nodeValue;
                $summarySpan.setAttribute(nodeName, nodeValue);
            }
            $summarySpanFocus.innerHTML = $summary.innerHTML;
            $summary.parentNode.replaceChild($summarySpan, $summary);
            $button.appendChild($summarySpan);
            $button.appendChild(this.getButtonPunctuationEl());
        }
        $button.appendChild($showToggle);
        $heading.removeChild($span);
        $heading.appendChild($button);
    };
    Accordion.prototype.onSectionToggle = function($section) {
        var expanded = this.isExpanded($section);
        this.setExpanded(!expanded, $section);
        this.storeState($section);
    };
    Accordion.prototype.onShowOrHideAllToggle = function() {
        var $module = this;
        var $sections = this.$sections;
        var nowExpanded = !this.checkIfAllSectionsOpen();
        nodeListForEach($sections, function($section) {
            $module.setExpanded(nowExpanded, $section);
            $module.storeState($section);
        });
        $module.updateShowAllButton(nowExpanded);
    };
    Accordion.prototype.setExpanded = function(expanded, $section) {
        var $icon = $section.querySelector("." + this.upChevronIconClass);
        var $showHideText = $section.querySelector("." + this.sectionShowHideTextClass);
        var $button = $section.querySelector("." + this.sectionButtonClass);
        var newButtonText = expanded ? "Hide" : "Show";
        var $visuallyHiddenText = document.createElement("span");
        $visuallyHiddenText.classList.add("govuk-visually-hidden");
        $visuallyHiddenText.innerHTML = " this section";
        $showHideText.innerHTML = newButtonText;
        $showHideText.appendChild($visuallyHiddenText);
        $button.setAttribute("aria-expanded", expanded);
        if (expanded) {
            $section.classList.add(this.sectionExpandedClass);
            $icon.classList.remove(this.downChevronIconClass);
        } else {
            $section.classList.remove(this.sectionExpandedClass);
            $icon.classList.add(this.downChevronIconClass);
        }
        var areAllSectionsOpen = this.checkIfAllSectionsOpen();
        this.updateShowAllButton(areAllSectionsOpen);
    };
    Accordion.prototype.isExpanded = function($section) {
        return $section.classList.contains(this.sectionExpandedClass);
    };
    Accordion.prototype.checkIfAllSectionsOpen = function() {
        var sectionsCount = this.$sections.length;
        var expandedSectionCount = this.$module.querySelectorAll("." + this.sectionExpandedClass).length;
        var areAllSectionsOpen = sectionsCount === expandedSectionCount;
        return areAllSectionsOpen;
    };
    Accordion.prototype.updateShowAllButton = function(expanded) {
        var $showAllIcon = this.$showAllButton.querySelector("." + this.upChevronIconClass);
        var $showAllText = this.$showAllButton.querySelector("." + this.showAllTextClass);
        var newButtonText = expanded ? "Hide all sections" : "Show all sections";
        this.$showAllButton.setAttribute("aria-expanded", expanded);
        $showAllText.innerHTML = newButtonText;
        if (expanded) {
            $showAllIcon.classList.remove(this.downChevronIconClass);
        } else {
            $showAllIcon.classList.add(this.downChevronIconClass);
        }
    };
    var helper = {
        checkForSessionStorage: function() {
            var testString = "this is the test string";
            var result;
            try {
                window.sessionStorage.setItem(testString, testString);
                result = window.sessionStorage.getItem(testString) === testString.toString();
                window.sessionStorage.removeItem(testString);
                return result;
            } catch (exception) {
                return false;
            }
        }
    };
    Accordion.prototype.storeState = function($section) {
        if (this.browserSupportsSessionStorage) {
            var $button = $section.querySelector("." + this.sectionButtonClass);
            if ($button) {
                var contentId = $button.getAttribute("aria-controls");
                var contentState = $button.getAttribute("aria-expanded");
                if (contentId && contentState) {
                    window.sessionStorage.setItem(contentId, contentState);
                }
            }
        }
    };
    Accordion.prototype.setInitialState = function($section) {
        if (this.browserSupportsSessionStorage) {
            var $button = $section.querySelector("." + this.sectionButtonClass);
            if ($button) {
                var contentId = $button.getAttribute("aria-controls");
                var contentState = contentId ? window.sessionStorage.getItem(contentId) : null;
                if (contentState !== null) {
                    this.setExpanded(contentState === "true", $section);
                }
            }
        }
    };
    Accordion.prototype.getButtonPunctuationEl = function() {
        var $punctuationEl = document.createElement("span");
        $punctuationEl.classList.add("govuk-visually-hidden", "govuk-accordion__section-heading-divider");
        $punctuationEl.innerHTML = ", ";
        return $punctuationEl;
    };
    (function(undefined) {
        var detect = "Window" in this;
        if (detect) return;
        if (typeof WorkerGlobalScope === "undefined" && typeof importScripts !== "function") {
            (function(global) {
                if (global.constructor) {
                    global.Window = global.constructor;
                } else {
                    (global.Window = global.constructor = new Function("return function Window() {}")()).prototype = this;
                }
            })(this);
        }
    }).call("object" === typeof window && window || "object" === typeof self && self || "object" === typeof global && global || {});
    (function(undefined) {
        var detect = function(global) {
            if (!("Event" in global)) return false;
            if (typeof global.Event === "function") return true;
            try {
                new Event("click");
                return true;
            } catch (e) {
                return false;
            }
        }(this);
        if (detect) return;
        (function() {
            var unlistenableWindowEvents = {
                click: 1,
                dblclick: 1,
                keyup: 1,
                keypress: 1,
                keydown: 1,
                mousedown: 1,
                mouseup: 1,
                mousemove: 1,
                mouseover: 1,
                mouseenter: 1,
                mouseleave: 1,
                mouseout: 1,
                storage: 1,
                storagecommit: 1,
                textinput: 1
            };
            if (typeof document === "undefined" || typeof window === "undefined") return;
            function indexOf(array, element) {
                var index = -1, length = array.length;
                while (++index < length) {
                    if (index in array && array[index] === element) {
                        return index;
                    }
                }
                return -1;
            }
            var existingProto = window.Event && window.Event.prototype || null;
            window.Event = Window.prototype.Event = function Event(type, eventInitDict) {
                if (!type) {
                    throw new Error("Not enough arguments");
                }
                var event;
                if ("createEvent" in document) {
                    event = document.createEvent("Event");
                    var bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
                    var cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
                    event.initEvent(type, bubbles, cancelable);
                    return event;
                }
                event = document.createEventObject();
                event.type = type;
                event.bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
                event.cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
                return event;
            };
            if (existingProto) {
                Object.defineProperty(window.Event, "prototype", {
                    configurable: false,
                    enumerable: false,
                    writable: true,
                    value: existingProto
                });
            }
            if (!("createEvent" in document)) {
                window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function addEventListener() {
                    var element = this, type = arguments[0], listener = arguments[1];
                    if (element === window && type in unlistenableWindowEvents) {
                        throw new Error("In IE8 the event: " + type + " is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.");
                    }
                    if (!element._events) {
                        element._events = {};
                    }
                    if (!element._events[type]) {
                        element._events[type] = function(event) {
                            var list = element._events[event.type].list, events = list.slice(), index = -1, length = events.length, eventElement;
                            event.preventDefault = function preventDefault() {
                                if (event.cancelable !== false) {
                                    event.returnValue = false;
                                }
                            };
                            event.stopPropagation = function stopPropagation() {
                                event.cancelBubble = true;
                            };
                            event.stopImmediatePropagation = function stopImmediatePropagation() {
                                event.cancelBubble = true;
                                event.cancelImmediate = true;
                            };
                            event.currentTarget = element;
                            event.relatedTarget = event.fromElement || null;
                            event.target = event.target || event.srcElement || element;
                            event.timeStamp = new Date().getTime();
                            if (event.clientX) {
                                event.pageX = event.clientX + document.documentElement.scrollLeft;
                                event.pageY = event.clientY + document.documentElement.scrollTop;
                            }
                            while (++index < length && !event.cancelImmediate) {
                                if (index in events) {
                                    eventElement = events[index];
                                    if (indexOf(list, eventElement) !== -1 && typeof eventElement === "function") {
                                        eventElement.call(element, event);
                                    }
                                }
                            }
                        };
                        element._events[type].list = [];
                        if (element.attachEvent) {
                            element.attachEvent("on" + type, element._events[type]);
                        }
                    }
                    element._events[type].list.push(listener);
                };
                window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function removeEventListener() {
                    var element = this, type = arguments[0], listener = arguments[1], index;
                    if (element._events && element._events[type] && element._events[type].list) {
                        index = indexOf(element._events[type].list, listener);
                        if (index !== -1) {
                            element._events[type].list.splice(index, 1);
                            if (!element._events[type].list.length) {
                                if (element.detachEvent) {
                                    element.detachEvent("on" + type, element._events[type]);
                                }
                                delete element._events[type];
                            }
                        }
                    }
                };
                window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function dispatchEvent(event) {
                    if (!arguments.length) {
                        throw new Error("Not enough arguments");
                    }
                    if (!event || typeof event.type !== "string") {
                        throw new Error("DOM Events Exception 0");
                    }
                    var element = this, type = event.type;
                    try {
                        if (!event.bubbles) {
                            event.cancelBubble = true;
                            var cancelBubbleEvent = function(event) {
                                event.cancelBubble = true;
                                (element || window).detachEvent("on" + type, cancelBubbleEvent);
                            };
                            this.attachEvent("on" + type, cancelBubbleEvent);
                        }
                        this.fireEvent("on" + type, event);
                    } catch (error) {
                        event.target = element;
                        do {
                            event.currentTarget = element;
                            if ("_events" in element && typeof element._events[type] === "function") {
                                element._events[type].call(element, event);
                            }
                            if (typeof element["on" + type] === "function") {
                                element["on" + type].call(element, event);
                            }
                            element = element.nodeType === 9 ? element.parentWindow : element.parentNode;
                        } while (element && !event.cancelBubble);
                    }
                    return true;
                };
                document.attachEvent("onreadystatechange", function() {
                    if (document.readyState === "complete") {
                        document.dispatchEvent(new Event("DOMContentLoaded", {
                            bubbles: true
                        }));
                    }
                });
            }
        })();
    }).call("object" === typeof window && window || "object" === typeof self && self || "object" === typeof global && global || {});
    var KEY_SPACE = 32;
    var DEBOUNCE_TIMEOUT_IN_SECONDS = 1;
    function Button($module) {
        this.$module = $module;
        this.debounceFormSubmitTimer = null;
    }
    Button.prototype.handleKeyDown = function(event) {
        var target = event.target;
        if (target.getAttribute("role") === "button" && event.keyCode === KEY_SPACE) {
            event.preventDefault();
            target.click();
        }
    };
    Button.prototype.debounce = function(event) {
        var target = event.target;
        if (target.getAttribute("data-prevent-double-click") !== "true") {
            return;
        }
        if (this.debounceFormSubmitTimer) {
            event.preventDefault();
            return false;
        }
        this.debounceFormSubmitTimer = setTimeout(function() {
            this.debounceFormSubmitTimer = null;
        }.bind(this), DEBOUNCE_TIMEOUT_IN_SECONDS * 1e3);
    };
    Button.prototype.init = function() {
        this.$module.addEventListener("keydown", this.handleKeyDown);
        this.$module.addEventListener("click", this.debounce);
    };
    var KEY_ENTER = 13;
    var KEY_SPACE$1 = 32;
    function Details($module) {
        this.$module = $module;
    }
    Details.prototype.init = function() {
        if (!this.$module) {
            return;
        }
        var hasNativeDetails = typeof this.$module.open === "boolean";
        if (hasNativeDetails) {
            return;
        }
        this.polyfillDetails();
    };
    Details.prototype.polyfillDetails = function() {
        var $module = this.$module;
        var $summary = this.$summary = $module.getElementsByTagName("summary").item(0);
        var $content = this.$content = $module.getElementsByTagName("div").item(0);
        if (!$summary || !$content) {
            return;
        }
        if (!$content.id) {
            $content.id = "details-content-" + generateUniqueID();
        }
        $module.setAttribute("role", "group");
        $summary.setAttribute("role", "button");
        $summary.setAttribute("aria-controls", $content.id);
        $summary.tabIndex = 0;
        if (this.$module.hasAttribute("open")) {
            $summary.setAttribute("aria-expanded", "true");
        } else {
            $summary.setAttribute("aria-expanded", "false");
            $content.style.display = "none";
        }
        this.polyfillHandleInputs($summary, this.polyfillSetAttributes.bind(this));
    };
    Details.prototype.polyfillSetAttributes = function() {
        if (this.$module.hasAttribute("open")) {
            this.$module.removeAttribute("open");
            this.$summary.setAttribute("aria-expanded", "false");
            this.$content.style.display = "none";
        } else {
            this.$module.setAttribute("open", "open");
            this.$summary.setAttribute("aria-expanded", "true");
            this.$content.style.display = "";
        }
        return true;
    };
    Details.prototype.polyfillHandleInputs = function(node, callback) {
        node.addEventListener("keypress", function(event) {
            var target = event.target;
            if (event.keyCode === KEY_ENTER || event.keyCode === KEY_SPACE$1) {
                if (target.nodeName.toLowerCase() === "summary") {
                    event.preventDefault();
                    if (target.click) {
                        target.click();
                    } else {
                        callback(event);
                    }
                }
            }
        });
        node.addEventListener("keyup", function(event) {
            var target = event.target;
            if (event.keyCode === KEY_SPACE$1) {
                if (target.nodeName.toLowerCase() === "summary") {
                    event.preventDefault();
                }
            }
        });
        node.addEventListener("click", callback);
    };
    function CharacterCount($module) {
        this.$module = $module;
        this.$textarea = $module.querySelector(".govuk-js-character-count");
        this.$visibleCountMessage = null;
        this.$screenReaderCountMessage = null;
        this.lastInputTimestamp = null;
    }
    CharacterCount.prototype.defaults = {
        characterCountAttribute: "data-maxlength",
        wordCountAttribute: "data-maxwords"
    };
    CharacterCount.prototype.init = function() {
        if (!this.$textarea) {
            return;
        }
        var $module = this.$module;
        var $textarea = this.$textarea;
        var $fallbackLimitMessage = document.getElementById($textarea.id + "-info");
        $textarea.insertAdjacentElement("afterend", $fallbackLimitMessage);
        var $screenReaderCountMessage = document.createElement("div");
        $screenReaderCountMessage.className = "govuk-character-count__sr-status govuk-visually-hidden";
        $screenReaderCountMessage.setAttribute("aria-live", "polite");
        this.$screenReaderCountMessage = $screenReaderCountMessage;
        $fallbackLimitMessage.insertAdjacentElement("afterend", $screenReaderCountMessage);
        var $visibleCountMessage = document.createElement("div");
        $visibleCountMessage.className = $fallbackLimitMessage.className;
        $visibleCountMessage.classList.add("govuk-character-count__status");
        $visibleCountMessage.setAttribute("aria-hidden", "true");
        this.$visibleCountMessage = $visibleCountMessage;
        $fallbackLimitMessage.insertAdjacentElement("afterend", $visibleCountMessage);
        $fallbackLimitMessage.classList.add("govuk-visually-hidden");
        this.options = this.getDataset($module);
        var countAttribute = this.defaults.characterCountAttribute;
        if (this.options.maxwords) {
            countAttribute = this.defaults.wordCountAttribute;
        }
        this.maxLength = $module.getAttribute(countAttribute);
        if (!this.maxLength) {
            return;
        }
        $textarea.removeAttribute("maxlength");
        this.bindChangeEvents();
        if ("onpageshow" in window) {
            window.addEventListener("pageshow", this.updateCountMessage.bind(this));
        } else {
            window.addEventListener("DOMContentLoaded", this.updateCountMessage.bind(this));
        }
        this.updateCountMessage();
    };
    CharacterCount.prototype.getDataset = function(element) {
        var dataset = {};
        var attributes = element.attributes;
        if (attributes) {
            for (var i = 0; i < attributes.length; i++) {
                var attribute = attributes[i];
                var match = attribute.name.match(/^data-(.+)/);
                if (match) {
                    dataset[match[1]] = attribute.value;
                }
            }
        }
        return dataset;
    };
    CharacterCount.prototype.count = function(text) {
        var length;
        if (this.options.maxwords) {
            var tokens = text.match(/\S+/g) || [];
            length = tokens.length;
        } else {
            length = text.length;
        }
        return length;
    };
    CharacterCount.prototype.bindChangeEvents = function() {
        var $textarea = this.$textarea;
        $textarea.addEventListener("keyup", this.handleKeyUp.bind(this));
        $textarea.addEventListener("focus", this.handleFocus.bind(this));
        $textarea.addEventListener("blur", this.handleBlur.bind(this));
    };
    CharacterCount.prototype.checkIfValueChanged = function() {
        if (!this.$textarea.oldValue) this.$textarea.oldValue = "";
        if (this.$textarea.value !== this.$textarea.oldValue) {
            this.$textarea.oldValue = this.$textarea.value;
            this.updateCountMessage();
        }
    };
    CharacterCount.prototype.updateCountMessage = function() {
        this.updateVisibleCountMessage();
        this.updateScreenReaderCountMessage();
    };
    CharacterCount.prototype.updateVisibleCountMessage = function() {
        var $textarea = this.$textarea;
        var $visibleCountMessage = this.$visibleCountMessage;
        var remainingNumber = this.maxLength - this.count($textarea.value);
        if (this.isOverThreshold()) {
            $visibleCountMessage.classList.remove("govuk-character-count__message--disabled");
        } else {
            $visibleCountMessage.classList.add("govuk-character-count__message--disabled");
        }
        if (remainingNumber < 0) {
            $textarea.classList.add("govuk-textarea--error");
            $visibleCountMessage.classList.remove("govuk-hint");
            $visibleCountMessage.classList.add("govuk-error-message");
        } else {
            $textarea.classList.remove("govuk-textarea--error");
            $visibleCountMessage.classList.remove("govuk-error-message");
            $visibleCountMessage.classList.add("govuk-hint");
        }
        $visibleCountMessage.innerHTML = this.formattedUpdateMessage();
    };
    CharacterCount.prototype.updateScreenReaderCountMessage = function() {
        var $screenReaderCountMessage = this.$screenReaderCountMessage;
        if (this.isOverThreshold()) {
            $screenReaderCountMessage.removeAttribute("aria-hidden");
        } else {
            $screenReaderCountMessage.setAttribute("aria-hidden", true);
        }
        $screenReaderCountMessage.innerHTML = this.formattedUpdateMessage();
    };
    CharacterCount.prototype.formattedUpdateMessage = function() {
        var $textarea = this.$textarea;
        var options = this.options;
        var remainingNumber = this.maxLength - this.count($textarea.value);
        var charVerb = "remaining";
        var charNoun = "character";
        var displayNumber = remainingNumber;
        if (options.maxwords) {
            charNoun = "word";
        }
        charNoun = charNoun + (remainingNumber === -1 || remainingNumber === 1 ? "" : "s");
        charVerb = remainingNumber < 0 ? "too many" : "remaining";
        displayNumber = Math.abs(remainingNumber);
        return "You have " + displayNumber + " " + charNoun + " " + charVerb;
    };
    CharacterCount.prototype.isOverThreshold = function() {
        var $textarea = this.$textarea;
        var options = this.options;
        var currentLength = this.count($textarea.value);
        var maxLength = this.maxLength;
        var thresholdPercent = options.threshold ? options.threshold : 0;
        var thresholdValue = maxLength * thresholdPercent / 100;
        return thresholdValue <= currentLength;
    };
    CharacterCount.prototype.handleKeyUp = function() {
        this.updateVisibleCountMessage();
        this.lastInputTimestamp = Date.now();
    };
    CharacterCount.prototype.handleFocus = function() {
        this.valueChecker = setInterval(function() {
            if (!this.lastInputTimestamp || Date.now() - 500 >= this.lastInputTimestamp) {
                this.checkIfValueChanged();
            }
        }.bind(this), 1e3);
    };
    CharacterCount.prototype.handleBlur = function() {
        clearInterval(this.valueChecker);
    };
    function Checkboxes($module) {
        this.$module = $module;
        this.$inputs = $module.querySelectorAll('input[type="checkbox"]');
    }
    Checkboxes.prototype.init = function() {
        var $module = this.$module;
        var $inputs = this.$inputs;
        nodeListForEach($inputs, function($input) {
            var target = $input.getAttribute("data-aria-controls");
            if (!target || !document.getElementById(target)) {
                return;
            }
            $input.setAttribute("aria-controls", target);
            $input.removeAttribute("data-aria-controls");
        });
        if ("onpageshow" in window) {
            window.addEventListener("pageshow", this.syncAllConditionalReveals.bind(this));
        } else {
            window.addEventListener("DOMContentLoaded", this.syncAllConditionalReveals.bind(this));
        }
        this.syncAllConditionalReveals();
        $module.addEventListener("click", this.handleClick.bind(this));
    };
    Checkboxes.prototype.syncAllConditionalReveals = function() {
        nodeListForEach(this.$inputs, this.syncConditionalRevealWithInputState.bind(this));
    };
    Checkboxes.prototype.syncConditionalRevealWithInputState = function($input) {
        var $target = document.getElementById($input.getAttribute("aria-controls"));
        if ($target && $target.classList.contains("govuk-checkboxes__conditional")) {
            var inputIsChecked = $input.checked;
            $input.setAttribute("aria-expanded", inputIsChecked);
            $target.classList.toggle("govuk-checkboxes__conditional--hidden", !inputIsChecked);
        }
    };
    Checkboxes.prototype.unCheckAllInputsExcept = function($input) {
        var allInputsWithSameName = document.querySelectorAll('input[type="checkbox"][name="' + $input.name + '"]');
        nodeListForEach(allInputsWithSameName, function($inputWithSameName) {
            var hasSameFormOwner = $input.form === $inputWithSameName.form;
            if (hasSameFormOwner && $inputWithSameName !== $input) {
                $inputWithSameName.checked = false;
                this.syncConditionalRevealWithInputState($inputWithSameName);
            }
        }.bind(this));
    };
    Checkboxes.prototype.unCheckExclusiveInputs = function($input) {
        var allInputsWithSameNameAndExclusiveBehaviour = document.querySelectorAll('input[data-behaviour="exclusive"][type="checkbox"][name="' + $input.name + '"]');
        nodeListForEach(allInputsWithSameNameAndExclusiveBehaviour, function($exclusiveInput) {
            var hasSameFormOwner = $input.form === $exclusiveInput.form;
            if (hasSameFormOwner) {
                $exclusiveInput.checked = false;
                this.syncConditionalRevealWithInputState($exclusiveInput);
            }
        }.bind(this));
    };
    Checkboxes.prototype.handleClick = function(event) {
        var $target = event.target;
        if ($target.type !== "checkbox") {
            return;
        }
        var hasAriaControls = $target.getAttribute("aria-controls");
        if (hasAriaControls) {
            this.syncConditionalRevealWithInputState($target);
        }
        if (!$target.checked) {
            return;
        }
        var hasBehaviourExclusive = $target.getAttribute("data-behaviour") === "exclusive";
        if (hasBehaviourExclusive) {
            this.unCheckAllInputsExcept($target);
        } else {
            this.unCheckExclusiveInputs($target);
        }
    };
    (function(undefined) {
        var detect = "document" in this && "matches" in document.documentElement;
        if (detect) return;
        Element.prototype.matches = Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || function matches(selector) {
            var element = this;
            var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
            var index = 0;
            while (elements[index] && elements[index] !== element) {
                ++index;
            }
            return !!elements[index];
        };
    }).call("object" === typeof window && window || "object" === typeof self && self || "object" === typeof global && global || {});
    (function(undefined) {
        var detect = "document" in this && "closest" in document.documentElement;
        if (detect) return;
        Element.prototype.closest = function closest(selector) {
            var node = this;
            while (node) {
                if (node.matches(selector)) return node; else node = "SVGElement" in window && node instanceof SVGElement ? node.parentNode : node.parentElement;
            }
            return null;
        };
    }).call("object" === typeof window && window || "object" === typeof self && self || "object" === typeof global && global || {});
    function ErrorSummary($module) {
        this.$module = $module;
    }
    ErrorSummary.prototype.init = function() {
        var $module = this.$module;
        if (!$module) {
            return;
        }
        this.setFocus();
        $module.addEventListener("click", this.handleClick.bind(this));
    };
    ErrorSummary.prototype.setFocus = function() {
        var $module = this.$module;
        if ($module.getAttribute("data-disable-auto-focus") === "true") {
            return;
        }
        $module.setAttribute("tabindex", "-1");
        $module.addEventListener("blur", function() {
            $module.removeAttribute("tabindex");
        });
        $module.focus();
    };
    ErrorSummary.prototype.handleClick = function(event) {
        var target = event.target;
        if (this.focusTarget(target)) {
            event.preventDefault();
        }
    };
    ErrorSummary.prototype.focusTarget = function($target) {
        if ($target.tagName !== "A" || $target.href === false) {
            return false;
        }
        var inputId = this.getFragmentFromUrl($target.href);
        var $input = document.getElementById(inputId);
        if (!$input) {
            return false;
        }
        var $legendOrLabel = this.getAssociatedLegendOrLabel($input);
        if (!$legendOrLabel) {
            return false;
        }
        $legendOrLabel.scrollIntoView();
        $input.focus({
            preventScroll: true
        });
        return true;
    };
    ErrorSummary.prototype.getFragmentFromUrl = function(url) {
        if (url.indexOf("#") === -1) {
            return false;
        }
        return url.split("#").pop();
    };
    ErrorSummary.prototype.getAssociatedLegendOrLabel = function($input) {
        var $fieldset = $input.closest("fieldset");
        if ($fieldset) {
            var legends = $fieldset.getElementsByTagName("legend");
            if (legends.length) {
                var $candidateLegend = legends[0];
                if ($input.type === "checkbox" || $input.type === "radio") {
                    return $candidateLegend;
                }
                var legendTop = $candidateLegend.getBoundingClientRect().top;
                var inputRect = $input.getBoundingClientRect();
                if (inputRect.height && window.innerHeight) {
                    var inputBottom = inputRect.top + inputRect.height;
                    if (inputBottom - legendTop < window.innerHeight / 2) {
                        return $candidateLegend;
                    }
                }
            }
        }
        return document.querySelector("label[for='" + $input.getAttribute("id") + "']") || $input.closest("label");
    };
    function NotificationBanner($module) {
        this.$module = $module;
    }
    NotificationBanner.prototype.init = function() {
        var $module = this.$module;
        if (!$module) {
            return;
        }
        this.setFocus();
    };
    NotificationBanner.prototype.setFocus = function() {
        var $module = this.$module;
        if ($module.getAttribute("data-disable-auto-focus") === "true") {
            return;
        }
        if ($module.getAttribute("role") !== "alert") {
            return;
        }
        if (!$module.getAttribute("tabindex")) {
            $module.setAttribute("tabindex", "-1");
            $module.addEventListener("blur", function() {
                $module.removeAttribute("tabindex");
            });
        }
        $module.focus();
    };
    function Header($module) {
        this.$module = $module;
        this.$menuButton = $module && $module.querySelector(".govuk-js-header-toggle");
        this.$menu = this.$menuButton && $module.querySelector("#" + this.$menuButton.getAttribute("aria-controls"));
        this.menuIsOpen = false;
        this.mql = null;
    }
    Header.prototype.init = function() {
        if (!this.$module || !this.$menuButton || !this.$menu) {
            return;
        }
        if ("matchMedia" in window) {
            this.mql = window.matchMedia("(min-width: 48.0625em)");
            if ("addEventListener" in this.mql) {
                this.mql.addEventListener("change", this.syncState.bind(this));
            } else {
                this.mql.addListener(this.syncState.bind(this));
            }
            this.syncState();
            this.$menuButton.addEventListener("click", this.handleMenuButtonClick.bind(this));
        } else {
            this.$menuButton.setAttribute("hidden", "");
        }
    };
    Header.prototype.syncState = function() {
        if (this.mql.matches) {
            this.$menu.removeAttribute("hidden");
            this.$menuButton.setAttribute("hidden", "");
        } else {
            this.$menuButton.removeAttribute("hidden");
            this.$menuButton.setAttribute("aria-expanded", this.menuIsOpen);
            if (this.menuIsOpen) {
                this.$menu.removeAttribute("hidden");
            } else {
                this.$menu.setAttribute("hidden", "");
            }
        }
    };
    Header.prototype.handleMenuButtonClick = function() {
        this.menuIsOpen = !this.menuIsOpen;
        this.syncState();
    };
    function Radios($module) {
        this.$module = $module;
        this.$inputs = $module.querySelectorAll('input[type="radio"]');
    }
    Radios.prototype.init = function() {
        var $module = this.$module;
        var $inputs = this.$inputs;
        nodeListForEach($inputs, function($input) {
            var target = $input.getAttribute("data-aria-controls");
            if (!target || !document.getElementById(target)) {
                return;
            }
            $input.setAttribute("aria-controls", target);
            $input.removeAttribute("data-aria-controls");
        });
        if ("onpageshow" in window) {
            window.addEventListener("pageshow", this.syncAllConditionalReveals.bind(this));
        } else {
            window.addEventListener("DOMContentLoaded", this.syncAllConditionalReveals.bind(this));
        }
        this.syncAllConditionalReveals();
        $module.addEventListener("click", this.handleClick.bind(this));
    };
    Radios.prototype.syncAllConditionalReveals = function() {
        nodeListForEach(this.$inputs, this.syncConditionalRevealWithInputState.bind(this));
    };
    Radios.prototype.syncConditionalRevealWithInputState = function($input) {
        var $target = document.getElementById($input.getAttribute("aria-controls"));
        if ($target && $target.classList.contains("govuk-radios__conditional")) {
            var inputIsChecked = $input.checked;
            $input.setAttribute("aria-expanded", inputIsChecked);
            $target.classList.toggle("govuk-radios__conditional--hidden", !inputIsChecked);
        }
    };
    Radios.prototype.handleClick = function(event) {
        var $clickedInput = event.target;
        if ($clickedInput.type !== "radio") {
            return;
        }
        var $allInputs = document.querySelectorAll('input[type="radio"][aria-controls]');
        nodeListForEach($allInputs, function($input) {
            var hasSameFormOwner = $input.form === $clickedInput.form;
            var hasSameName = $input.name === $clickedInput.name;
            if (hasSameName && hasSameFormOwner) {
                this.syncConditionalRevealWithInputState($input);
            }
        }.bind(this));
    };
    function SkipLink($module) {
        this.$module = $module;
        this.$linkedElement = null;
        this.linkedElementListener = false;
    }
    SkipLink.prototype.init = function() {
        if (!this.$module) {
            return;
        }
        this.$linkedElement = this.getLinkedElement();
        if (!this.$linkedElement) {
            return;
        }
        this.$module.addEventListener("click", this.focusLinkedElement.bind(this));
    };
    SkipLink.prototype.getLinkedElement = function() {
        var linkedElementId = this.getFragmentFromUrl();
        if (!linkedElementId) {
            return false;
        }
        return document.getElementById(linkedElementId);
    };
    SkipLink.prototype.focusLinkedElement = function() {
        var $linkedElement = this.$linkedElement;
        if (!$linkedElement.getAttribute("tabindex")) {
            $linkedElement.setAttribute("tabindex", "-1");
            $linkedElement.classList.add("govuk-skip-link-focused-element");
            if (!this.linkedElementListener) {
                this.$linkedElement.addEventListener("blur", this.removeFocusProperties.bind(this));
                this.linkedElementListener = true;
            }
        }
        $linkedElement.focus();
    };
    SkipLink.prototype.removeFocusProperties = function() {
        this.$linkedElement.removeAttribute("tabindex");
        this.$linkedElement.classList.remove("govuk-skip-link-focused-element");
    };
    SkipLink.prototype.getFragmentFromUrl = function() {
        if (!this.$module.hash) {
            return false;
        }
        return this.$module.hash.split("#").pop();
    };
    (function(undefined) {
        var detect = "document" in this && "nextElementSibling" in document.documentElement;
        if (detect) return;
        Object.defineProperty(Element.prototype, "nextElementSibling", {
            get: function() {
                var el = this.nextSibling;
                while (el && el.nodeType !== 1) {
                    el = el.nextSibling;
                }
                return el;
            }
        });
    }).call("object" === typeof window && window || "object" === typeof self && self || "object" === typeof global && global || {});
    (function(undefined) {
        var detect = "document" in this && "previousElementSibling" in document.documentElement;
        if (detect) return;
        Object.defineProperty(Element.prototype, "previousElementSibling", {
            get: function() {
                var el = this.previousSibling;
                while (el && el.nodeType !== 1) {
                    el = el.previousSibling;
                }
                return el;
            }
        });
    }).call("object" === typeof window && window || "object" === typeof self && self || "object" === typeof global && global || {});
    function Tabs($module) {
        this.$module = $module;
        this.$tabs = $module.querySelectorAll(".govuk-tabs__tab");
        this.keys = {
            left: 37,
            right: 39,
            up: 38,
            down: 40
        };
        this.jsHiddenClass = "govuk-tabs__panel--hidden";
    }
    Tabs.prototype.init = function() {
        if (typeof window.matchMedia === "function") {
            this.setupResponsiveChecks();
        } else {
            this.setup();
        }
    };
    Tabs.prototype.setupResponsiveChecks = function() {
        this.mql = window.matchMedia("(min-width: 40.0625em)");
        this.mql.addListener(this.checkMode.bind(this));
        this.checkMode();
    };
    Tabs.prototype.checkMode = function() {
        if (this.mql.matches) {
            this.setup();
        } else {
            this.teardown();
        }
    };
    Tabs.prototype.setup = function() {
        var $module = this.$module;
        var $tabs = this.$tabs;
        var $tabList = $module.querySelector(".govuk-tabs__list");
        var $tabListItems = $module.querySelectorAll(".govuk-tabs__list-item");
        if (!$tabs || !$tabList || !$tabListItems) {
            return;
        }
        $tabList.setAttribute("role", "tablist");
        nodeListForEach($tabListItems, function($item) {
            $item.setAttribute("role", "presentation");
        });
        nodeListForEach($tabs, function($tab) {
            this.setAttributes($tab);
            $tab.boundTabClick = this.onTabClick.bind(this);
            $tab.boundTabKeydown = this.onTabKeydown.bind(this);
            $tab.addEventListener("click", $tab.boundTabClick, true);
            $tab.addEventListener("keydown", $tab.boundTabKeydown, true);
            this.hideTab($tab);
        }.bind(this));
        var $activeTab = this.getTab(window.location.hash) || this.$tabs[0];
        this.showTab($activeTab);
        $module.boundOnHashChange = this.onHashChange.bind(this);
        window.addEventListener("hashchange", $module.boundOnHashChange, true);
    };
    Tabs.prototype.teardown = function() {
        var $module = this.$module;
        var $tabs = this.$tabs;
        var $tabList = $module.querySelector(".govuk-tabs__list");
        var $tabListItems = $module.querySelectorAll(".govuk-tabs__list-item");
        if (!$tabs || !$tabList || !$tabListItems) {
            return;
        }
        $tabList.removeAttribute("role");
        nodeListForEach($tabListItems, function($item) {
            $item.removeAttribute("role", "presentation");
        });
        nodeListForEach($tabs, function($tab) {
            $tab.removeEventListener("click", $tab.boundTabClick, true);
            $tab.removeEventListener("keydown", $tab.boundTabKeydown, true);
            this.unsetAttributes($tab);
        }.bind(this));
        window.removeEventListener("hashchange", $module.boundOnHashChange, true);
    };
    Tabs.prototype.onHashChange = function(e) {
        var hash = window.location.hash;
        var $tabWithHash = this.getTab(hash);
        if (!$tabWithHash) {
            return;
        }
        if (this.changingHash) {
            this.changingHash = false;
            return;
        }
        var $previousTab = this.getCurrentTab();
        this.hideTab($previousTab);
        this.showTab($tabWithHash);
        $tabWithHash.focus();
    };
    Tabs.prototype.hideTab = function($tab) {
        this.unhighlightTab($tab);
        this.hidePanel($tab);
    };
    Tabs.prototype.showTab = function($tab) {
        this.highlightTab($tab);
        this.showPanel($tab);
    };
    Tabs.prototype.getTab = function(hash) {
        return this.$module.querySelector('.govuk-tabs__tab[href="' + hash + '"]');
    };
    Tabs.prototype.setAttributes = function($tab) {
        var panelId = this.getHref($tab).slice(1);
        $tab.setAttribute("id", "tab_" + panelId);
        $tab.setAttribute("role", "tab");
        $tab.setAttribute("aria-controls", panelId);
        $tab.setAttribute("aria-selected", "false");
        $tab.setAttribute("tabindex", "-1");
        var $panel = this.getPanel($tab);
        $panel.setAttribute("role", "tabpanel");
        $panel.setAttribute("aria-labelledby", $tab.id);
        $panel.classList.add(this.jsHiddenClass);
    };
    Tabs.prototype.unsetAttributes = function($tab) {
        $tab.removeAttribute("id");
        $tab.removeAttribute("role");
        $tab.removeAttribute("aria-controls");
        $tab.removeAttribute("aria-selected");
        $tab.removeAttribute("tabindex");
        var $panel = this.getPanel($tab);
        $panel.removeAttribute("role");
        $panel.removeAttribute("aria-labelledby");
        $panel.classList.remove(this.jsHiddenClass);
    };
    Tabs.prototype.onTabClick = function(e) {
        if (!e.target.classList.contains("govuk-tabs__tab")) {
            return false;
        }
        e.preventDefault();
        var $newTab = e.target;
        var $currentTab = this.getCurrentTab();
        this.hideTab($currentTab);
        this.showTab($newTab);
        this.createHistoryEntry($newTab);
    };
    Tabs.prototype.createHistoryEntry = function($tab) {
        var $panel = this.getPanel($tab);
        var id = $panel.id;
        $panel.id = "";
        this.changingHash = true;
        window.location.hash = this.getHref($tab).slice(1);
        $panel.id = id;
    };
    Tabs.prototype.onTabKeydown = function(e) {
        switch (e.keyCode) {
          case this.keys.left:
          case this.keys.up:
            this.activatePreviousTab();
            e.preventDefault();
            break;

          case this.keys.right:
          case this.keys.down:
            this.activateNextTab();
            e.preventDefault();
            break;
        }
    };
    Tabs.prototype.activateNextTab = function() {
        var currentTab = this.getCurrentTab();
        var nextTabListItem = currentTab.parentNode.nextElementSibling;
        if (nextTabListItem) {
            var nextTab = nextTabListItem.querySelector(".govuk-tabs__tab");
        }
        if (nextTab) {
            this.hideTab(currentTab);
            this.showTab(nextTab);
            nextTab.focus();
            this.createHistoryEntry(nextTab);
        }
    };
    Tabs.prototype.activatePreviousTab = function() {
        var currentTab = this.getCurrentTab();
        var previousTabListItem = currentTab.parentNode.previousElementSibling;
        if (previousTabListItem) {
            var previousTab = previousTabListItem.querySelector(".govuk-tabs__tab");
        }
        if (previousTab) {
            this.hideTab(currentTab);
            this.showTab(previousTab);
            previousTab.focus();
            this.createHistoryEntry(previousTab);
        }
    };
    Tabs.prototype.getPanel = function($tab) {
        var $panel = this.$module.querySelector(this.getHref($tab));
        return $panel;
    };
    Tabs.prototype.showPanel = function($tab) {
        var $panel = this.getPanel($tab);
        $panel.classList.remove(this.jsHiddenClass);
    };
    Tabs.prototype.hidePanel = function(tab) {
        var $panel = this.getPanel(tab);
        $panel.classList.add(this.jsHiddenClass);
    };
    Tabs.prototype.unhighlightTab = function($tab) {
        $tab.setAttribute("aria-selected", "false");
        $tab.parentNode.classList.remove("govuk-tabs__list-item--selected");
        $tab.setAttribute("tabindex", "-1");
    };
    Tabs.prototype.highlightTab = function($tab) {
        $tab.setAttribute("aria-selected", "true");
        $tab.parentNode.classList.add("govuk-tabs__list-item--selected");
        $tab.setAttribute("tabindex", "0");
    };
    Tabs.prototype.getCurrentTab = function() {
        return this.$module.querySelector(".govuk-tabs__list-item--selected .govuk-tabs__tab");
    };
    Tabs.prototype.getHref = function($tab) {
        var href = $tab.getAttribute("href");
        var hash = href.slice(href.indexOf("#"), href.length);
        return hash;
    };
    function initAll(options) {
        options = typeof options !== "undefined" ? options : {};
        var scope = typeof options.scope !== "undefined" ? options.scope : document;
        var $buttons = scope.querySelectorAll('[data-module="govuk-button"]');
        nodeListForEach($buttons, function($button) {
            new Button($button).init();
        });
        var $accordions = scope.querySelectorAll('[data-module="govuk-accordion"]');
        nodeListForEach($accordions, function($accordion) {
            new Accordion($accordion).init();
        });
        var $details = scope.querySelectorAll('[data-module="govuk-details"]');
        nodeListForEach($details, function($detail) {
            new Details($detail).init();
        });
        var $characterCounts = scope.querySelectorAll('[data-module="govuk-character-count"]');
        nodeListForEach($characterCounts, function($characterCount) {
            new CharacterCount($characterCount).init();
        });
        var $checkboxes = scope.querySelectorAll('[data-module="govuk-checkboxes"]');
        nodeListForEach($checkboxes, function($checkbox) {
            new Checkboxes($checkbox).init();
        });
        var $errorSummary = scope.querySelector('[data-module="govuk-error-summary"]');
        new ErrorSummary($errorSummary).init();
        var $toggleButton = scope.querySelector('[data-module="govuk-header"]');
        new Header($toggleButton).init();
        var $notificationBanners = scope.querySelectorAll('[data-module="govuk-notification-banner"]');
        nodeListForEach($notificationBanners, function($notificationBanner) {
            new NotificationBanner($notificationBanner).init();
        });
        var $radios = scope.querySelectorAll('[data-module="govuk-radios"]');
        nodeListForEach($radios, function($radio) {
            new Radios($radio).init();
        });
        var $skipLink = scope.querySelector('[data-module="govuk-skip-link"]');
        new SkipLink($skipLink).init();
        var $tabs = scope.querySelectorAll('[data-module="govuk-tabs"]');
        nodeListForEach($tabs, function($tabs) {
            new Tabs($tabs).init();
        });
    }
    exports.initAll = initAll;
    exports.Accordion = Accordion;
    exports.Button = Button;
    exports.Details = Details;
    exports.CharacterCount = CharacterCount;
    exports.Checkboxes = Checkboxes;
    exports.ErrorSummary = ErrorSummary;
    exports.Header = Header;
    exports.NotificationBanner = NotificationBanner;
    exports.Radios = Radios;
    exports.SkipLink = SkipLink;
    exports.Tabs = Tabs;
});

(function(scope, window) {
    window.hmpoNodeListForEach = function(nodes, callback) {
        if (!nodes) return;
        if (window.NodeList.prototype.forEach) {
            return nodes.forEach(callback);
        }
        for (var i = 0; i < nodes.length; i++) {
            callback.call(window, nodes[i], i, nodes);
        }
    };
    window.hmpoOn = function(name, element, handler) {
        if (element.addEventListener) element.addEventListener(name, handler); else element["on" + name] = handler;
    };
    window.hmpoOnClick = function(element, handler) {
        return window.hmpoOn("click", element, handler);
    };
    window.hmpoPreventDefault = function(fn) {
        return function(e) {
            e = e || window.event;
            e.preventDefault();
            if (typeof fn === "function") fn.call(this, e);
            return false;
        };
    };
})(document, window);

(function(scope, window) {
    "use strict";
    function AutoSubmit($element) {
        this.$element = $element;
        var $submitButton = this.$element.querySelectorAll(".hmpo-auto-submit__manual button")[0];
        this.$form = $submitButton.form;
        if ($element.getAttribute("data-loaded")) return;
        $element.setAttribute("data-loaded", true);
        this.cloneForm = $element.getAttribute("data-clone-form") === "true";
        this.submitDelay = parseInt(this.$element.getAttribute("data-submit-delay"), 10) || 0;
        this.helpDelay = parseInt(this.$element.getAttribute("data-help-delay"), 10) || null;
        this.manualDelay = parseInt(this.$element.getAttribute("data-manual-delay"), 10) || null;
        this.submitTimer = setTimeout(this.submit.bind(this), this.submitDelay);
        if (this.helpDelay) this.helpTimer = setTimeout(this.showHelp.bind(this), this.helpDelay);
        if (this.manualDelay) this.manualTimer = setTimeout(this.showManual.bind(this), this.manualDelay);
    }
    AutoSubmit.prototype.submit = function() {
        if (this.cloneForm && this.$form.cloneNode && this.$form.replaceWith) {
            var clonedForm = this.$form.cloneNode(true);
            this.$form.replaceWith(clonedForm);
            this.$form = clonedForm;
            this.$element = this.$form.querySelectorAll('[data-module="hmpo-auto-submit"]')[0];
        }
        this.$form.submit();
    };
    AutoSubmit.prototype.showHelp = function() {
        this.$element.className = this.$element.className + " hmpo-auto-submit__show-help";
    };
    AutoSubmit.prototype.showManual = function() {
        this.$element.className = this.$element.className + " hmpo-auto-submit__show-manual";
    };
    function addEvent(el, type, callback) {
        if (el.addEventListener) {
            el.addEventListener(type, callback, false);
        } else if (el.attachEvent) {
            el.attachEvent("on" + type, callback);
        }
    }
    function documentReady(callback) {
        addEvent(window, "load", callback);
    }
    function init() {
        var $elements = scope.querySelectorAll('[data-module="hmpo-auto-submit"]');
        window.hmpoNodeListForEach($elements, function($element) {
            new AutoSubmit($element);
        });
    }
    documentReady(init);
})(document, window);

(function(scope, window) {
    "use strict";
    var throttle = function(fn, time) {
        var timer;
        return function() {
            if (timer) clearTimeout(timer);
            timer = setTimeout(function() {
                timer = null;
                fn();
            }, time);
        };
    };
    var charsleftHandler = function(input, element, max, defaultHtml, templateHtml, showAt) {
        var value = input.value || "";
        value = value.replace(/\r?\n/g, "\r\n");
        var length = value.length || 0, remaining = max - length;
        if (remaining < 0) {
            input.value = value.substr(0, max);
            remaining = 0;
        }
        if (!showAt || remaining <= showAt) {
            element.innerHTML = templateHtml.replace("{count}", remaining).replace("{s}", remaining === 1 ? "" : "s");
        } else {
            element.innerHTML = defaultHtml.replace("{max}", max);
        }
    };
    var elementHandler = function(element) {
        var inputId = element.getAttribute("data-chars-left-input");
        var input = scope.getElementById(inputId);
        if (!input) {
            throw new Error("input not found for hmpoCharsLeft: " + inputId);
        }
        var max = parseInt(element.getAttribute("data-chars-left-max") || input.getAttribute("maxlength"), 10);
        var defaultHtml = element.getAttribute("data-chars-left-default");
        var templateHtml = element.getAttribute("data-chars-left-template");
        var showAt = parseInt(element.getAttribute("data-chars-left-showat"), 10);
        var handler = throttle(function() {
            charsleftHandler(input, element, max, defaultHtml, templateHtml, showAt);
        }, 50);
        window.hmpoOn("keypress", input, handler);
        window.hmpoOn("keydown", input, handler);
        window.hmpoOn("keyup", input, handler);
        window.hmpoOn("change", input, handler);
        handler();
    };
    var $charsLeft = scope.querySelectorAll('[data-module="hmpo-chars-left"]');
    window.hmpoNodeListForEach($charsLeft, elementHandler);
})(document, window);

(function(scope, window) {
    "use strict";
    if (!window.opener || !window.close) return;
    var $closeButtonDivs = scope.querySelectorAll('[data-module="hmpo-close"]');
    window.hmpoNodeListForEach($closeButtonDivs, function(element) {
        var html = element.getAttribute("data-button");
        element.innerHTML = html;
    });
    setTimeout(function() {
        var close = window.hmpoPreventDefault(function() {
            window.close();
        });
        var $closeButtons = scope.querySelectorAll('[data-module="hmpo-close"] button');
        window.hmpoNodeListForEach($closeButtons, function(element) {
            window.hmpoOnClick(element, close);
        });
    });
})(document, window);

(function() {
    "use strict";
    var setCookie = function(name, value, days) {
        var cookieString = name + "=" + value + "; path=/";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1e3);
            cookieString = cookieString + "; expires=" + date.toGMTString();
        }
        if (document.location.protocol === "https:") {
            cookieString = cookieString + "; Secure";
        }
        document.cookie = cookieString;
    };
    var getCookie = function(name) {
        var nameEQ = name + "=";
        var cookies = document.cookie.split(";");
        for (var i = 0, len = cookies.length; i < len; i++) {
            var cookie = cookies[i];
            while (cookie.charAt(0) === " ") {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                return decodeURIComponent(cookie.substring(nameEQ.length));
            }
        }
        return null;
    };
    var message = document.getElementsByClassName("js-cookie-banner")[0];
    if (message) {
        var cookieName = message.getAttribute && message.getAttribute("cookie-name") || "seen_cookie_message";
        var cookieDays = message.getAttribute && parseInt(message.getAttribute("cookie-days"), 10) || 28;
        if (!getCookie(cookieName)) {
            message.style.display = "block";
            setCookie(cookieName, "yes", cookieDays);
        }
    }
})();

(function(scope, window) {
    "use strict";
    if (!window.print) return;
    var print = function() {
        window.print();
    };
    var $printLinks = scope.querySelectorAll('[data-module="hmpo-print-page"]');
    window.hmpoNodeListForEach($printLinks, function(element) {
        window.hmpoOnClick(element, window.hmpoPreventDefault(print));
    });
})(document, window);

window.GOVUKFrontend.Radios.prototype.originalSyncConditionalRevealWithInputState = window.GOVUKFrontend.Radios.prototype.syncConditionalRevealWithInputState || window.GOVUKFrontend.Radios.prototype.setAttributes;

window.GOVUKFrontend.Radios.prototype.syncConditionalRevealWithInputState = window.GOVUKFrontend.Radios.prototype.setAttributes = function($input) {
    var isMulti = Boolean(this.$module.getAttribute("data-multi-conditional"));
    if (!isMulti) {
        return window.GOVUKFrontend.Radios.prototype.originalSyncConditionalRevealWithInputState.apply(this, arguments);
    }
    var controls = $input.getAttribute("aria-controls");
    var $content = document.getElementById(controls);
    if (!$content) return window.GOVUKFrontend.Radios.prototype.originalSyncConditionalRevealWithInputState.apply(this, arguments);
    var conditionMet = false;
    var $allInputs = document.querySelectorAll('input[type="radio"]');
    for (var i = 0; i < $allInputs.length; i++) {
        var $otherInput = $allInputs[i];
        var otherInputControls = $otherInput.getAttribute("data-aria-controls") || $otherInput.getAttribute("aria-controls");
        if (controls === otherInputControls && $otherInput.checked) conditionMet = true;
    }
    $input.setAttribute("aria-expanded", conditionMet);
    $content.classList.toggle("govuk-radios__conditional--hidden", !conditionMet);
};

(function(scope, window) {
    documentReady(noPaste);
    function documentReady(callback) {
        addEvent(document, "DOMContentLoaded", callback);
        addEvent(window, "load", callback);
    }
    function each(a, cb) {
        a = [].slice.call(a);
        for (var i = 0; i < a.length; i++) cb(a[i], i, a);
    }
    var prevent = function(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = true;
        return false;
    };
    function hasClass(el, className) {
        return el.className.split(/\s/).indexOf(className) !== -1;
    }
    function getElementsByClass(parent, tag, className) {
        if (parent.getElementsByClassName) {
            return parent.getElementsByClassName(className);
        } else {
            var elems = [];
            each(parent.getElementsByTagName(tag), function(t) {
                if (hasClass(t, className)) {
                    elems.push(t);
                }
            });
            return elems;
        }
    }
    function noPaste() {
        var elements = getElementsByClass(document, [ "input" ], "js-nopaste");
        each(elements, function(element) {
            once(element, "js-nopaste", function() {
                addEvent(element, "paste", prevent);
                addEvent(element, "dragdrop", prevent);
                addEvent(element, "drop", prevent);
            });
        });
    }
    function once(elem, key, callback) {
        if (!elem) {
            return;
        }
        elem.started = elem.started || {};
        if (!elem.started[key]) {
            elem.started[key] = true;
            callback(elem);
        }
    }
    function addEvent(el, type, callback) {
        if (el.addEventListener) {
            el.addEventListener(type, callback, false);
        } else if (el.attachEvent) {
            el.attachEvent("on" + type, callback);
        }
    }
})(document, window);