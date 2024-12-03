# Lilak

Lilak is a license acknowledgment tool for npm projects. Most OSS licenses require attribution, and Lilak is designed to generate this for you.

## Why use Lilak

There are several tools already out there to handle license compliance; why add another? From what I saw, all the tools fell a little short. Most OSS licenses require you to include a copy of the license in your code. [license-checker-rseidelsohn](https://github.com/RSeidelsohn/license-checker-rseidelsohn) does this, but the output is huge. In part, this is because it includes a copy of every license for every dependency. For example, if DependencyA and DependencyB both are MIT licensed, license-checker-rseidelsohn includes two copies of the license text. These texts are identical except for the copyright. When you add up all your dependencies and their dependencies, that can be a lot of redundant text!

What Lilak does is aggregate this. Going back to our example of DependencyA and DependencyB, Lilak does the following: 1. Compare both dependencies's licenses, sans copyright, to a stored MIT text. 2. If the license is the same, replaces the text with a path to the stored MIT text. 3. The result is that both DependencyA and DependencyB point to the same MIT text. In your project, simply insert the copyright into the stored MIT, and voila! You've got the license and saved some storage.

But, what if it's not a standard MIT license? Suppose DependencyA's MIT license has been modified. In that case: 1. DependencyA's license is stored in full 2. DependencyB points to the stored MIT license 3. If you only have two dependencies, this doesn't help much. But, this ensures you've got all the unique licenses and, as much as possible, reduced storage space for everything else.
