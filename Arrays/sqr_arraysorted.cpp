#include<iostream>
#include<bits/stdc++.h>
using namespace std;

    vector<int> sortedSquares(vector<int>& nums) {
        vector <int> neg;
        vector <int> pos;
        for(int i=0;i<nums.size();i++){
            if(nums[i]<0){
            neg.push_back(nums[i]);
            }
            else{
                pos.push_back(nums[i]);
            }
        }

        if(neg.size()==0){
            for(int i=0;i<pos.size();i++){
                pos[i]=pos[i]*pos[i];
            }
            return pos;
        }
        if (pos.size()==0){
            for(int i=0;i<neg.size();i++){
                neg[i]=neg[i]*neg[i];
            }
            reverse(neg.begin(),neg.end());
            return neg;
        }
        int i=0;int j=0;
        int n=neg.size();
        int m=pos.size();
        vector <int> res;
        for (int i =0 ; i<neg.size();i++){
            neg[i]=neg[i]*neg[i];
        }
        for (int i =0 ; i<pos.size();i++){
            pos[i]=pos[i]*pos[i];
        }
        reverse(neg.begin(),neg.end());
        while (i<n&&j<m){
            if(neg[i]>pos[j]){
                res.push_back(pos[j]);
                j++;
            }
            else{
                res.push_back(neg[i]);
                i++;
            }
        }
        while(i<n){
            res.push_back(neg[i]);
            i++;
        }
        while(j<m){
            res.push_back(pos[j]);
            j++;
        }
       return res;
    }
int main(){
    vector <int> nums(9) ;
    for (int i=0; i<nums.size();i++){
        cout<<"elements :";
        cin>>nums[i];
    }
    vector <int> result = sortedSquares(nums);
    for (int i=0;i<result.size();i++){
        cout<< " "<<result[i];
    }

}