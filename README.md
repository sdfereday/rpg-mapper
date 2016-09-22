# What is this? #
RPG Mapper is basically a tool that generates a map array with multiple layers. This is designed to take some of the complexity away from creating an array mapping of your level. It also has an ROT feature so you can use that to generate your level foundations.

It makes a few assumptions such as:
* It doesn't argue where you put the tiles over the top of the foundations. So you could stick an enemy in thin air if you wanted to. I could disable this, but I'll leave it up to the users discretion.
* It also assumes that the formatting of the array is what you'll be using. If something more is required then either a different tool should be used, or a different method of parsing it.

Things still to add:
* An orthographic representation of the mapping for visual sugar.
* Exporting to electron so it can be run as a desktop app.
* Ability to assign graphics to each tile type.
* Save to text file and pretty print for export data.
* Some initial config options such as width and height, as this is currently hard coded to 6x6 units.