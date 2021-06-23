# Export-Email-Functionality
Enables special functionality on export for EDMs generated in Outfit

# Usage
Include the following JS Files
```
<script src="https://cdn.jsdelivr.net/gh/OutfitDelivery/Export-Email-Functionality@1.0.0/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/OutfitDelivery/Export-Email-Functionality@1.0.0/clipboard.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/OutfitDelivery/Export-Email-Functionality@1.0.0/jszip.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/OutfitDelivery/Export-Email-Functionality@1.0.0/fileSaver.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/OutfitDelivery/Export-Email-Functionality@1.0.0/htmlminifier.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/OutfitDelivery/Export-Email-Functionality@1.0.0/htmlparser.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/OutfitDelivery/Export-Email-Functionality@1.0.0/jszip-utils.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/OutfitDelivery/Export-Email-Functionality@1.0.0/exportEmailFunctionality.min.js"></script>
```

Call this function in your main script file
`copyHTMLFunctionality();`


## Default Settings
From the source, for reference, these can be overriden in the function call.
i.e. `copyHTMLFunctionality({copyToClipboard: false});`
```
let defaultSettings = {
  pandora: false,
  copyToClipboard: true,
  copyHTMLCode: true,
  downloadIndex: true,
  downloadZip: true
};
```

Note: at this point the pandora setting will do nothing.

# Changelog
## v1.0.0
- Inital Release
