#include <iostream>
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cout << "Enter size of array: ";
    cin >> n;

    vector<int> nums(n);
    cout << "Enter elements:\n";
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }

    int target;
    cout << "Enter target: ";
    cin >> target;

    unordered_map<int, int> mp;  // value -> index

    for (int i = 0; i < n; i++) {
        int need = target - nums[i];

        if (mp.count(need)) {
            cout << "Indices: " << mp[need] << " " << i << endl;
            return 0;
        }

        mp[nums[i]] = i;
    }

    cout << "No pair found" << endl;
    return 0;
}


// Approach: HashMap to store seen elements
// Time Complexity: O(n)
// Space Complexity: O(n)
