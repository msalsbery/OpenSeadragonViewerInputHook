##OpenSeadragonViewerInputHook

[See the Demo/Test Site Live Here](http://msalsbery.github.io/openseadragonimaginghelper/index.html)

OpenSeadragonViewerInputHook is a plugin for [OpenSeadragon](https://github.com/openseadragon/openseadragon) 1.0.0+
which provides hooks into the user input event pipeline for providing additional behavior and/or
overriding the default behavior.

###Usage

[Download openseadragon-viewerinputhook.js Here](http://msalsbery.github.io/openseadragonimaginghelper/scripts/openseadragon-viewerinputhook.js)

To use the plugin, add **openseadragon-viewerinputhook.js** after **openseadragon.js** to your site.
This adds the **ViewerInputHook** class to the OpenSeadragon namespace.

A **ViewerInputHook** object can be created and attached to an [OpenSeadragon.Viewer](http://openseadragon.github.io/docs/symbols/OpenSeadragon.Viewer.html) two ways:


1. Call the addViewerInputHook method on the viewer
2. Create a new ViewerInputHook object, passing a viewer reference in the options parameter

Both methods return a new ViewerInputHook object (although there's currently no public properties or methods available), and
both methods take an options parameter where the event handlers to be hooked may be specified (see the 'Details' section below).

```javascript
    // Example 1 - Use the Viewer.addViewerInputHook() method to create a ViewerInputHook

    // create an OpenSeadragon viewer
    var viewer = OpenSeadragon({...});
    // add a ViewerInputHook to the viewer
    var viewerInputHook = viewer.addViewerInputHook({...});


    // Example 2 - Attach a new ViewerInputHook to an existing OpenSeadragon.Viewer

    var viewerInputHook = new OpenSeadragon.ViewerInputHook({viewer: existingviewer, ...});
```

###Details

Event handler methods are specified in the options object passed when creating a ViewerInputHook object (see example code below).

All event handler methods have the following signature:

    handlerFunc(event)

The following viewer event handlers can be hooked:


1. enterHandler
2. exitHandler
3. pressHandler
4. releaseHandler
5. moveHandler
6. scrollHandler
7. clickHandler
8. dragHandler
9. keyHandler
10. focusHandler
11. blurHandler

The ViewerInputHook class inserts your event hook handler methods in front of any existing event handler methods
so the attached handler will be called first. Additional ViewerInputHook objects can be added on the same viewer to create a chain of hook methods, 
where the last added handler(s) will be called first.

Your hook event handler methods can control the event handling behavior in two ways:


1. Set event.stopHandlers = true to prevent any more handlers in the event handler chain from being called
2. Set event.stopBubbling = true to prevent the original DOM event from bubbling up the DOM tree (all handlers returning false will also disable bubbling)

```javascript
    // Example

    var viewer = OpenSeadragon({...});
    var viewerInputHook = viewer.addViewerInputHook({scrollHandler: onOSDCanvasScroll,
                                                     clickHandler: onOSDCanvasClick});

    function onOSDCanvasScroll(event) {
        // set event.stopHandlers = true to prevent any more handlers in the chain from being called
        // set event.stopBubbling = true to prevent the original event from bubbling

        // Disable mousewheel zoom on the viewer and let the original mousewheel events bubble
        if (!event.isTouchEvent) {
            event.stopHandlers = true;
            return true;
        }
    }

    function onOSDCanvasClick(event) {
        // set event.stopHandlers = true to prevent any more handlers in the chain from being called
        // set event.stopBubbling = true to prevent the original event from bubbling

        // Disable click zoom on the viewer by simply not letting the default handler get called
        event.stopHandlers = true;
        event.stopBubbling = true;
    }
```

###Demo/Test Site

The [OpenSeadragonImagingHelper plugin demo/test site](https://github.com/msalsbery/OpenSeadragonImagingHelper) uses 
OpenSeadragonViewerInputHook to monitor cursor position and provide custom click and mousewheel event actions.

The sample code is in [scripts/viewmodel.js](http://msalsbery.github.io/openseadragonimaginghelper/scripts/viewmodel.js).  

###Notes

###In the works...


1. Provide hooks on reference strip events
2. Provide hooks on navigator events
