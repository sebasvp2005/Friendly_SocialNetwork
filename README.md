# Friendly_SocialNetwork

This project’s main purpose is to analyze the algorithms we used at the creation of social networks. 

##Description

First of all, as we can deduce, a social network is confirmed by users and connection between these users. That’s why the way to represent this information is by graphs, considering that the users would be nodes and the following connection would be the edges.

We must also take into account that the data we are working with is huge. For this reason we must implement efficient and smart algorithms to our app.

##Algorithms
Some of the algorithms implemented are:

###Breadth first search:

The main reason for using this algorithm is to find connectivity between two users. We define the connectivity of two users as the Shortest-Path of following connections to get to the other user.

The naturalness of the problem demands an algorithm focused on finding shortest paths.

That's why our best candidate is BFS. Its time complexity is  O(edges + nodes), a pretty consistent solution. 

###Depth limited search:

One problem I found while fetching the posts of other users, is that there is a huge amount of posts if we try to get all user’s posts. To prevent fetching all posts, we can implement a DLS with a maximum depth of 4 users. By doing this we significantly reduce the amount of post processed and one interesting feature is that we can keep incrementing this depth to get more posts.

Its time complexity is O(edges + nodes) where the number of nodes is determined by its depth.

