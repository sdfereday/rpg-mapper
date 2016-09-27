# What is this? #

RPG Mapper is basically a tool that generates a map array with multiple layers. This is designed to take some of the complexity away from creating an array mapping of your level. It also has an ROT feature so you can use that to generate your level foundations.

**It makes a few assumptions such as:**

* It doesn't argue where you put the tiles over the top of the foundations. So you could stick an enemy in thin air if you wanted to. I could disable this, but I'll leave it up to the users discretion.
* It also assumes that the formatting of the array is what you'll be using. If something more is required then either a different tool should be used, or a different method of parsing it.

**Things still to add or fix (wip list):**
* Code and SCSS cleanup.
* Optimisations of code upon generation (currently slows down about about 60x60 size, presumably dom-related).
* Ability to assign graphics to each tile type, or at least some sort of icon.
* On map config change, ability to apply new options (such as resize).

**Nice to haves or features to add:**
* An orthographic representation of the mapping for visual sugar.
* Exporting to electron so it can be run as a desktop app.
* Save out option to a JSON file as well as just the exporter.